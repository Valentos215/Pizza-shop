import { useEffect, useState, memo } from 'react';

import Show from 'shared/components/show/Show';
import { ICity } from 'pages/checkout/form/utils/form.utils';

import s from 'pages/checkout/form/autocomplete/Autocomplete.module.scss';

interface IStoreAutocompleteProps {
  city: ICity | null;
  store: string;
  setStore: (value: string) => void;
  check: boolean;
  setCheck: (value: boolean) => void;
}

const StoreAutocomplete = memo(
  ({ city, store, setStore, check, setCheck }: IStoreAutocompleteProps) => {
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
    const inputClassName = check && !store ? s.error : '';
    const expandClassName = storeExpand ? `${s.expand} ${s.active}` : s.expand;

    return (
      <div
        tabIndex={13}
        onFocus={() => {
          if (city) setStoreExpand(true);
        }}
        onBlur={() => setStoreExpand(false)}
        onClick={() => {
          if (!city) setCheck(true);
        }}
        className={wrapperClassName}
      >
        <Show condition={!store && check}>
          <p className={s.error}>Choose store</p>
        </Show>
        <Show condition={!check || !!store}>
          <p>Store</p>
        </Show>
        <input
          disabled={!city}
          onClick={() => {
            setStoreSearch('');
            setCheck(false);
          }}
          onChange={(e) => setStoreSearch(e.target.value)}
          placeholder="Choose store"
          value={storeSearch}
          autoComplete="off"
          className={inputClassName}
        ></input>
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
