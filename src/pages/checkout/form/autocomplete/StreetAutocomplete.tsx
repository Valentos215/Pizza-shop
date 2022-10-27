import { useEffect, useState, memo } from 'react';

import Show from 'shared/components/show/Show';
import { ICity, IStreet } from 'pages/checkout/form/utils/form.utils';
import { useSearchStreet } from 'pages/checkout/form/hooks/autocomplete.hooks';

import s from 'pages/checkout/form/autocomplete/Autocomplete.module.scss';

interface IStreetAutocompleteProps {
  city: ICity | null;
  street: string;
  setStreet: (value: string) => void;
  shouldCheck: boolean;
  setShouldCheck: (value: boolean) => void;
}

const StreetAutocomplete = memo(
  ({ city, street, setStreet, shouldCheck, setShouldCheck }: IStreetAutocompleteProps) => {
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
    const inputClassName = shouldCheck && !street ? s.error : '';
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
          if (!city) setShouldCheck(true);
        }}
        className={wrapperClassName}
      >
        <Show condition={!street && shouldCheck}>
          <p className={s.error}>Choose street</p>
        </Show>
        <Show condition={!shouldCheck || !!street}>
          <p>Street</p>
        </Show>
        <input
          disabled={!city}
          onClick={() => {
            setStreetSearch('');
            setShouldCheck(false);
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
