import s from "./Autocomplete.module.scss";
import { useEffect, useState } from "react";
import jsonData from "../../../../assets/cities.json";

type City_type = { id: string; slug: string; stores: string[]; bbox: string[] };
type CityProps = {
  city: City_type | null;
  setCity: React.Dispatch<React.SetStateAction<City_type | null>>;
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
};

const CityAutocomplete = ({ city, setCity, check, setCheck }: CityProps) => {
  const [cityExpand, setCityExpand] = useState(false);
  const [citySearch, setCitySearch] = useState("");

  const cities: City_type[] = JSON.parse(JSON.stringify(jsonData));

  const currentCities = cities.filter((city) => {
    if (citySearch)
      return city.slug.toUpperCase().includes(citySearch.toUpperCase());
    return city;
  });

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
      {!city && check && <p className={s.error}>Choose city</p>}
      {(!check || !!city) && <p>City</p>}
      <input
        onClick={() => {
          setCitySearch("");
          setCheck(false);
        }}
        onChange={(e) => setCitySearch(e.target.value)}
        placeholder="Choose city"
        value={citySearch}
        autoComplete="off"
        className={(check && !city && s.error) || ""}
      ></input>
      <span></span>
      <div className={cityExpand ? `${s.expand} ${s.active}` : s.expand}>
        {currentCities &&
          currentCities.map((city: City_type) => (
            <div
              className={s.expand__option}
              onClick={() => {
                setCity(city);
                setCitySearch(city.slug);
              }}
              key={city.id}
            >
              {city.slug}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CityAutocomplete;
