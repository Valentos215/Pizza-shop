import s from './Autocomplete.module.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Street = { id: string; text: string };
type City_type = { id: string; slug: string; stores: string[]; bbox: string[] };
type StoreProps = {
  city: City_type | null;
  street: string;
  setStreet: React.Dispatch<React.SetStateAction<string>>;
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
};

const StreetAutocomplete = React.memo(
  ({ city, street, setStreet, check, setCheck }: StoreProps) => {
    const [streetExpand, setStreetExpand] = useState(false);
    const [streetSearch, setStreetSearch] = useState('');
    const [searchResults, setSearchResults] = useState<Street[] | null>(null);
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
      if (!streetSearch) return;

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
        className={streetExpand ? `${s.wrapper} ${s.active}` : s.wrapper}
      >
        {!street && check && <p className={s.error}>Choose street</p>}
        {(!check || !!street) && <p>Street</p>}
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
          className={(check && !street && s.error) || ''}
        ></input>
        <span></span>
        <div className={streetExpand ? `${s.expand} ${s.active}` : s.expand}>
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
