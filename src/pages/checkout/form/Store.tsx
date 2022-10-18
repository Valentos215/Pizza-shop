import { useEffect, useState, memo } from 'react';

import CityAutocomplete from 'pages/checkout/form/autocomplete/CityAutocomplete';
import StoreAutocomplete from 'pages/checkout/form/autocomplete/StoreAutocomplete';
import { ICity, IStoreAdress } from 'pages/checkout/form/utils/form.utils';

import s from './Store.module.scss';
interface IStoreProps {
  setStoreAdress: (value: IStoreAdress | null) => void;
  check: boolean;
  setCheck: (value: boolean) => void;
}

const Store = memo(({ setStoreAdress, check, setCheck }: IStoreProps) => {
  const [city, setCity] = useState<ICity | null>(null);
  const [store, setStore] = useState('');

  useEffect(() => {
    if (!city || !store) {
      setStoreAdress(null);
    } else {
      setStoreAdress({ city: city!.slug, store: store });
    }
  }, [city, store, setStoreAdress]);

  return (
    <div className={s.store}>
      <h3>Store</h3>
      <form className={s.form}>
        <CityAutocomplete city={city} setCity={setCity} check={check} setCheck={setCheck} />
        <StoreAutocomplete
          city={city}
          store={store}
          setStore={setStore}
          check={check}
          setCheck={setCheck}
        />
      </form>
    </div>
  );
});

export default Store;
