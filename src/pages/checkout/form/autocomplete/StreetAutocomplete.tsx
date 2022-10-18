import { useEffect, useState, memo } from 'react';

import axios from 'axios';
import Show from 'shared/components/show/Show';
import { ICity, IStreet } from 'pages/checkout/form/utils/form.utils';

import s from './Autocomplete.module.scss';
interface IStreetAutocompleteProps {
  city: ICity | null;
  street: string;
  setStreet: (value: string) => void;
  check: boolean;
  setCheck: (value: boolean) => void;
}

const StreetAutocomplete = memo(
  ({ city, street, setStreet, check, setCheck }: IStreetAutocompleteProps) => {
    const [streetExpand, setStreetExpand] = useState(false);
    const [streetSearch, setStreetSearch] = useState('');
    const [searchResults, setSearchResults] = useState<IStreet[] | null>(null);
    const apiUrl = process.env.REACT_APP_API_URL;
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiFetchParams = 'limit=5&country=UA&language=en&fuzzyMatch=true';

    useEffect(() => {
      setStreetExpand(false);
    }, [street]);

    useEffect(() => {
      setStreet('');
      setStreetSearch('');
    }, [city, setStreet]);

    useEffect(() => {
      if (!streetSearch) {
        return;
      }

      const delayDebounceFn = setTimeout(() => {
        axios
          .get(
            `${apiUrl}${streetSearch}.json?bbox=${city?.bbox}&access_token=${apiKey}&${apiFetchParams}`,
          )
          .then((resp) => {
            if (!resp.data.features[0]) {
              setSearchResults([{ id: '1', text: 'No matches' }]);
            } else {
              setSearchResults(resp.data.features);
            }
          });
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }, [apiKey, apiUrl, city?.bbox, streetSearch]);

    const wrapperClassName = streetExpand ? `${s.wrapper} ${s.active}` : s.wrapper;
    const inputClassName = check && !street ? s.error : '';
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
        <Show condition={!street && check}>
          <p className={s.error}>Choose street</p>
        </Show>
        <Show condition={!check || !!street}>
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
        ></input>
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
