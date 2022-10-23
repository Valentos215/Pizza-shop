import { useEffect, useState, memo } from 'react';

import Show from 'shared/components/show/Show';
import { ICity, IStreet } from 'pages/checkout/form/utils/form.utils';

import s from 'pages/checkout/form/autocomplete/Autocomplete.module.scss';
import { useSearchStreet } from 'pages/checkout/form/hooks/autocomplete.hooks';

interface IStreetAutocompleteProps {
  city: ICity | null;
  street: string;
  setStreet: (value: string) => void;
  showAddressOrStore: boolean;
  setCheck: (value: boolean) => void;
}

const StreetAutocomplete = memo(
  ({ city, street, setStreet, showAddressOrStore, setCheck }: IStreetAutocompleteProps) => {
    const [streetExpand, setStreetExpand] = useState(false);
    const [streetSearch, setStreetSearch] = useState('');
    const [searchResults, setSearchResults] = useState<IStreet[] | null>(null);

    useEffect(() => {
      setStreetExpand(false);
    }, [street]);

    useEffect(() => {
      setStreet('');
      setStreetSearch('');
    }, [city, setStreet]);

    useSearchStreet({ city, streetSearch, setSearchResults });

    const wrapperClassName = streetExpand ? `${s.wrapper} ${s.active}` : s.wrapper;
    const inputClassName = showAddressOrStore && !street ? s.error : '';
    const expandClassName = streetExpand ? `${s.expand} ${s.active}` : s.expand;

    return (
      <div
        tabIndex={14}
        onFocus={() => {
          if (city) setStreetExpand(true);
        }}
        onBlur={() => {
          setStreetExpand(false);
          setStreetSearch(street);
        }}
        onClick={() => {
          if (!city) setCheck(true);
        }}
        className={wrapperClassName}
      >
        <Show condition={!street && showAddressOrStore}>
          <p className={s.error}>Choose street</p>
        </Show>
        <Show condition={!showAddressOrStore || !!street}>
          <p>Street</p>
        </Show>
        <input
          disabled={!city}
          onClick={() => {
            setStreetSearch('');
            setCheck(false);
            setSearchResults(null);
          }}
          onChange={(e) => setStreetSearch(e.target.value)}
          placeholder="start typing..."
          value={streetSearch}
          autoComplete="off"
          className={inputClassName}
        />
        <span></span>
        <div className={expandClassName}>
          {searchResults &&
            searchResults.map((street) => (
              <div
                className={s.expand__option}
                onClick={() => {
                  setStreet(street.text);
                  setStreetSearch(street.text);
                }}
                key={street.id}
              >
                {street.text}
              </div>
            ))}
        </div>
      </div>
    );
  },
);

export default StreetAutocomplete;
