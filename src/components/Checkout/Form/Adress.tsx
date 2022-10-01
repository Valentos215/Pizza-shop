import axios from "axios";
import { useEffect, useState } from "react";
import s from "./Adress.module.scss";
import jsonData from "../../../assets/cities.json";

type Street = { id: string; text: string };
type City = { id: string; slug: string; bbox: string[] };
type DeliveryAdress = {
  city: string;
  street: string;
  house: string;
  apartment?: string;
  entrance?: string;
};
type AdressProps = {
  setDeliveryAdress: React.Dispatch<
    React.SetStateAction<DeliveryAdress | null>
  >;
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
};

const Adress = ({ setDeliveryAdress, check, setCheck }: AdressProps) => {
  const [cityExpand, setCityExpand] = useState(false);
  const [city, setCity] = useState<City | null>(null);
  const [citySearch, setCitySearch] = useState("");
  const [street, setStreet] = useState("");
  const [streetInput, setStreetInput] = useState("");
  const [searchResults, setSearchResults] = useState<Street[] | null>(null);
  const [streetExpand, setStreetExpand] = useState(false);
  const [house, setHouse] = useState("");
  const [apartment, setApartment] = useState("");
  const [entrance, setEntrance] = useState("");

  const cities: City[] = JSON.parse(JSON.stringify(jsonData));
  const currentCities = cities.filter((city) => {
    if (citySearch)
      return city.slug.toUpperCase().includes(citySearch.toUpperCase());
    return city;
  });

  useEffect(() => {
    if (!streetInput) return;
    const delayDebounceFn = setTimeout(() => {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${streetInput}.json?bbox=${city?.bbox}&access_token=pk.eyJ1IjoidmFsZW50aW5vczIxNSIsImEiOiJjbDhuYzN5N3gwZXJiM29vYW5vdzJndzNtIn0.sXTtaj_m9upSxo6msqBwRA&limit=5&country=UA&language=en&fuzzyMatch=true`
        )
        .then((resp) => {
          if (!resp.data.features[0]) {
            setSearchResults([{ id: "1", text: "No matches" }]);
          } else {
            setSearchResults(resp.data.features);
          }
        });
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [streetInput]);

  useEffect(() => {
    if (!city || !street || !house) {
      setDeliveryAdress(null);
    } else {
      setDeliveryAdress({
        city: city!.slug,
        street: street,
        house: house,
        apartment: apartment,
        entrance: entrance,
      });
    }
  }, [city, street, house, apartment, entrance, setDeliveryAdress]);

  return (
    <div className={s.adress}>
      <h3
        onClick={() => {
          setCityExpand(false);
          setCitySearch(city ? city.slug : "");
          setStreetExpand(false);
          setStreetInput(street || "");
        }}
      >
        Adress
      </h3>
      <form className={s.form}>
        <div
          onFocus={() => {
            setCityExpand(true);
            setStreetExpand(false);
          }}
          className={
            cityExpand ? `${s.form__input} ${s.active}` : s.form__input
          }
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
              currentCities.map((city: City) => (
                <div
                  className={s.expand__option}
                  onClick={() => {
                    setCity(city);
                    setCitySearch(city.slug);
                    setCityExpand(false);
                    setStreet("");
                    setStreetInput("");
                  }}
                  key={city.id}
                >
                  {city.slug}
                </div>
              ))}
          </div>
        </div>
        <div
          onClick={() => {
            if (!city) setCityExpand(true);
          }}
          className={
            streetExpand ? `${s.form__input} ${s.active}` : s.form__input
          }
        >
          {!street && check && <p className={s.error}>Choose street</p>}
          {(!check || !!street) && <p>Street</p>}
          <input
            onFocus={() => setStreetExpand(true)}
            onClick={() => {
              setStreetInput("");
              setSearchResults(null);
              setCheck(false);
            }}
            placeholder="start typing..."
            value={streetInput}
            onChange={(e) => setStreetInput(e.target.value)}
            autoComplete="off"
            className={(check && !street && s.error) || ""}
            disabled={!city}
          ></input>
          <span></span>
          <div className={streetExpand ? `${s.expand} ${s.active}` : s.expand}>
            {searchResults &&
              searchResults.map((street: Street) => (
                <div
                  className={s.expand__option}
                  onClick={() => {
                    setStreet(street.text);
                    setStreetInput(street.text);
                    setStreetExpand(false);
                  }}
                  key={street.id}
                >
                  {street.text}
                </div>
              ))}
          </div>
        </div>
        <div className={`${s.form__row} ${s.two}`}>
          <div className={`${s.form__input} ${s.margin}`}>
            {!house && check && <p className={s.error}>Enter house number</p>}
            {(!check || !!house) && <p>House</p>}
            <input
              value={house}
              onChange={(e) => setHouse(e.target.value)}
              placeholder="House number"
              className={(check && !house && s.error) || ""}
              onClick={() => setCheck(false)}
            ></input>
          </div>
          <div className={`${s.form__input} ${s.margin}`}>
            <p>Apartment</p>
            <input
              value={apartment}
              onChange={(e) => setApartment(e.target.value)}
              placeholder="Apartment"
            ></input>
          </div>
          <div className={`${s.form__input} ${s.margin}`}>
            <p>Entrance</p>
            <input
              value={entrance}
              onChange={(e) => setEntrance(e.target.value)}
              placeholder="Entrance"
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Adress;
