import { useEffect, useState, memo } from 'react';

import Show from 'shared/components/show/Show';
import { ICity } from 'pages/checkout/form/utils/form.utils';

import s from 'pages/checkout/form/autocomplete/Autocomplete.module.scss';

interface IStoreAutocompleteProps {
  city: ICity | null;
  store: string;
  setStore: (value: string) => void;
  shouldCheck: boolean;
  setShouldCheck: (value: boolean) => void;
}

const StoreAutocomplete = memo(
  ({ city, store, setStore, shouldCheck, setShouldCheck }: IStoreAutocompleteProps) => {
    const [storeExpand, setStoreExpand] = useState(false);
    const [storeSearch, setStoreSearch] = useState('');

    const currentStores = city?.stores.filter((store: string) => {
      if (storeSearch) {
        return store.toUpperCase().includes(storeSearch.toUpperCase());
      }

      return store;
    });

    useEffect(() => {
      setStoreExpand(false);
    }, [store]);

    useEffect(() => {
      setStore('');
      setStoreSearch('');
    }, [city, setStore]);

    const wrapperClassName = storeExpand ? `${s.wrapper} ${s.active}` : s.wrapper;
    const inputClassName = shouldCheck && !store ? s.error : '';
    const expandClassName = storeExpand ? `${s.expand} ${s.active}` : s.expand;

    return (
      <div
        tabIndex={13}
        onFocus={() => {
          if (city) setStoreExpand(true);
        }}
        onBlur={() => setStoreExpand(false)}
        onClick={() => {
          if (!city) setShouldCheck(true);
        }}
        className={wrapperClassName}
      >
        <Show condition={!store && shouldCheck}>
          <p className={s.error}>Choose store</p>
        </Show>
        <Show condition={!shouldCheck || !!store}>
          <p>Store</p>
        </Show>
        <input
          disabled={!city}
          onClick={() => {
            setStoreSearch('');
            setShouldCheck(false);
          }}
          onChange={(e) => setStoreSearch(e.target.value)}
          placeholder="Choose store"
          value={storeSearch}
          autoComplete="off"
          className={inputClassName}
        />
        <span></span>
        <div className={expandClassName}>
          {currentStores &&
            currentStores.map((store) => (
              <div
                className={s.expand__option}
                onClick={() => {
                  setStore(store);
                  setStoreSearch(store);
                }}
                key={store}
              >
                {store}
              </div>
            ))}
        </div>
      </div>
    );
  },
);

export default StoreAutocomplete;
