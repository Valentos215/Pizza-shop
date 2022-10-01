import s from "./Store.module.scss";
import { useEffect, useState } from "react";
import jsonData from "../../../assets/cities.json";

type City = { id: string; slug: string; stores: string[] };
type StoreAdress = { city: string; store: string };
type StoreProps = {
  setStoreAdress: React.Dispatch<React.SetStateAction<StoreAdress | null>>;
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
};

const Store = ({ setStoreAdress, check, setCheck }: StoreProps) => {
  const [cityExpand, setCityExpand] = useState(false);
  const [city, setCity] = useState<City | null>(null);
  const [citySearch, setCitySearch] = useState("");
  const [storeExpand, setStoreExpand] = useState(false);
  const [store, setStore] = useState("");
  const [storeSearch, setStoreSearch] = useState("");

  const cities: City[] = JSON.parse(JSON.stringify(jsonData));

  const currentCities = cities.filter((city) => {
    if (citySearch)
      return city.slug.toUpperCase().includes(citySearch.toUpperCase());
    return city;
  });
  const currentStores = city?.stores.filter((store) => {
    if (storeSearch)
      return store.toUpperCase().includes(storeSearch.toUpperCase());
    return store;
  });

  useEffect(() => {
    if (!city || !store) {
      setStoreAdress(null);
    } else {
      setStoreAdress({ city: city!.slug, store: store });
    }
  }, [city, store, setStoreAdress]);

  return (
    <div className={s.store}>
      <h3
        onClick={() => {
          setCitySearch(city ? city.slug : "");
          setCityExpand(false);
          setStoreExpand(false);
          setStoreSearch(store);
        }}
      >
        Store
      </h3>
      <form className={s.form}>
        <div
          onFocus={() => {
            setCityExpand(true);
            setStoreExpand(false);
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
                <p
                  onClick={() => {
                    setCity(city);
                    setCitySearch(city.slug);
                    setCityExpand(false);
                    setStore("");
                    setStoreSearch("");
                  }}
                  key={city.id}
                >
                  {city.slug}
                </p>
              ))}
          </div>
        </div>
        <div
          onFocus={() => {
            if (city) setStoreExpand(true);
          }}
          className={
            storeExpand ? `${s.form__input} ${s.active}` : s.form__input
          }
        >
          {!store && check && <p className={s.error}>Choose store</p>}
          {(!check || !!store) && <p>Store</p>}
          <input
            disabled={!city}
            onClick={() => {
              setStoreSearch("");
              setCheck(false);
            }}
            onChange={(e) => setStoreSearch(e.target.value)}
            placeholder="Choose store"
            value={storeSearch}
            autoComplete="off"
            className={(check && !store && s.error) || ""}
          ></input>
          <span></span>
          <div className={storeExpand ? `${s.expand} ${s.active}` : s.expand}>
            {currentStores &&
              currentStores.map((store) => (
                <p
                  onClick={() => {
                    setStore(store);
                    setStoreSearch(store);
                    setStoreExpand(false);
                  }}
                  key={store}
                >
                  {store}
                </p>
              ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Store;
