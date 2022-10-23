import { useEffect, useState, memo } from 'react';

import CityAutocomplete from 'pages/checkout/form/autocomplete/CityAutocomplete';
import StoreAutocomplete from 'pages/checkout/form/autocomplete/StoreAutocomplete';
import { ICity, IStoreAdress } from 'pages/checkout/form/utils/form.utils';

import s from 'pages/checkout/form/Store.module.scss';

interface IStoreProps {
  setStoreAddress: (value: IStoreAdress | null) => void;
  showAddressOrStore: boolean;
  setShowAddressOrStore: (value: boolean) => void;
}

const Store = memo(
  ({ setStoreAddress, showAddressOrStore, setShowAddressOrStore }: IStoreProps) => {
    const [city, setCity] = useState<ICity | null>(null);
    const [store, setStore] = useState('');

    useEffect(() => {
      if (!city || !store) {
        setStoreAddress(null);
      } else {
        setStoreAddress({ city: city!.slug, store: store });
      }
    }, [city, store, setStoreAddress]);

    return (
      <div className={s.store}>
        <h3>Store</h3>
        <form className={s.form}>
          <CityAutocomplete
            city={city}
            setCity={setCity}
            showAddressOrStore={showAddressOrStore}
            setShowAddressOrStore={setShowAddressOrStore}
          />
          <StoreAutocomplete
            city={city}
            store={store}
            setStore={setStore}
            check={showAddressOrStore}
            setShowAddressOrStore={setShowAddressOrStore}
          />
        </form>
      </div>
    );
  },
);

export default Store;
