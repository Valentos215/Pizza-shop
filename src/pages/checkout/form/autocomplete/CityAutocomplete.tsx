import { useEffect, useState, memo } from 'react';

import Show from 'shared/components/show/Show';
import { ICity, parseJson } from 'pages/checkout/form/utils/form.utils';

import jsonData from 'assets/cities.json';

import s from 'pages/checkout/form/autocomplete/Autocomplete.module.scss';

interface ICityAutocompleteProps {
  city: ICity | null;
  setCity: (value: ICity | null) => void;
  showAddressOrStore: boolean;
  setShowAddressOrStore: (value: boolean) => void;
}

const CityAutocomplete = memo(
  ({ city, setCity, showAddressOrStore, setShowAddressOrStore }: ICityAutocompleteProps) => {
    const [cityExpand, setCityExpand] = useState(false);
    const [citySearch, setCitySearch] = useState('');

    const cities: ICity[] = parseJson<ICity[]>(jsonData);

    const currentCities = cities.filter((city) => {
      if (citySearch) {
        return city.slug.toUpperCase().includes(citySearch.toUpperCase());
      }
      return city;
    });

    useEffect(() => {
      setCityExpand(false);
    }, [city]);

    const wrapperClassName = cityExpand ? `${s.wrapper} ${s.active}` : s.wrapper;
    const inputClassName = showAddressOrStore && !city ? s.error : '';
    const expandClassName = cityExpand ? `${s.expand} ${s.active}` : s.expand;

    return (
      <div
        tabIndex={12}
        onFocus={() => setCityExpand(true)}
        onBlur={() => {
          setCityExpand(false);
        }}
        className={wrapperClassName}
      >
        <Show condition={!city && showAddressOrStore}>
          <p className={s.error}>Choose city</p>
        </Show>
        <Show condition={!showAddressOrStore || !!city}>
          <p>City</p>
        </Show>
        <input
          onClick={() => {
            setCitySearch('');
            setShowAddressOrStore(false);
          }}
          onChange={(e) => setCitySearch(e.target.value)}
          placeholder="Choose city"
          value={citySearch}
          autoComplete="off"
          className={inputClassName}
        />
        <span></span>
        <div className={expandClassName}>
          {currentCities &&
            currentCities.map((city: ICity) => (
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
