import React, { useEffect, useState } from 'react';

import Show from 'shared/components/show/Show';
import { ICityType } from 'shared/types';

import jsonData from 'assets/cities.json';

import s from 'pages/checkout/form/autocomplete/Autocomplete.module.scss';

interface ICityAutocompleteProps {
  city: ICityType | null;
  setCity: (value: ICityType | null) => void;
  check: boolean;
  setCheck: (value: boolean) => void;
}

const CityAutocomplete = React.memo(
  ({ city, setCity, check, setCheck }: ICityAutocompleteProps) => {
    const [cityExpand, setCityExpand] = useState(false);
    const [citySearch, setCitySearch] = useState('');

    const cities: ICityType[] = JSON.parse(JSON.stringify(jsonData));

    const currentCities = cities.filter((city) => {
      if (citySearch) return city.slug.toUpperCase().includes(citySearch.toUpperCase());
      return city;
    });

    const shouldShowChooseCity = !city && check;

    useEffect(() => {
      setCityExpand(false);
    }, [city]);

    return (
      <div
        tabIndex={12}
        onFocus={() => setCityExpand(true)}
        onBlur={() => {
          setCityExpand(false);
        }}
        className={cityExpand ? `${s.wrapper} ${s.active}` : s.wrapper}
      >
        <Show condition={shouldShowChooseCity}>
          <p className={s.error}>Choose city</p>
        </Show>

        <Show condition={!check || !!city}>
          <p>City</p>
        </Show>

        <input
          onClick={() => {
            setCitySearch('');
            setCheck(false);
          }}
          onChange={(e) => setCitySearch(e.target.value)}
          placeholder="Choose city"
          value={citySearch}
          autoComplete="off"
          className={(check && !city && s.error) || ''}
        />
        <span></span>
        <div className={cityExpand ? `${s.expand} ${s.active}` : s.expand}>
          {currentCities &&
            currentCities.map((city: ICityType) => (
              <div
                key={city.id}
                className={s.expand__option}
                onClick={() => {
                  setCity(city);
                  setCitySearch(city.slug);
                }}
              >
                {city.slug}
              </div>
            ))}
        </div>
      </div>
    );
  },
);

export default CityAutocomplete;
