import s from "./Store.module.scss";
import { useState } from "react";

const Store = () => {
  const cities = ["Kyiv", "Brovary", "Dnipro", "Irpin", "Lviv", "Vinnytsia"];
  const [cityExpand, setCityExpand] = useState(false);
  const [city, setCity] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [storeExpand, setStoreExpand] = useState(false);
  const [store, setStore] = useState("");
  const [storeSearch, setStoreSearch] = useState("");
  return (
    <div className={s.store}>
      <h3>Store</h3>
      <form className={s.form}>
        <div
          tabIndex={7}
          onBlur={() => {
            setCitySearch(city);
            setCityExpand(false);
          }}
          onFocus={() => setCityExpand(true)}
          className={
            cityExpand ? `${s.form__input} ${s.active}` : s.form__input
          }
        >
          <input
            onClick={() => setCitySearch("")}
            onChange={(e) => setCitySearch(e.target.value)}
            name="city"
            placeholder="Choose city"
            value={citySearch}
          ></input>
          <span></span>
          <div className={cityExpand ? `${s.expand} ${s.active}` : s.expand}>
            {cities.map((city) => (
              <p
                onClick={() => {
                  setCity(city);
                  setCitySearch(city);
                  setCityExpand(false);
                }}
                key={city}
              >
                {city}
              </p>
            ))}
          </div>
        </div>
        <div
          tabIndex={8}
          onBlur={() => {
            setStoreSearch(store);
            setStoreExpand(false);
          }}
          onFocus={() => setStoreExpand(true)}
          className={
            storeExpand ? `${s.form__input} ${s.active}` : s.form__input
          }
        >
          <input
            onClick={() => setStoreSearch("")}
            onChange={(e) => setStoreSearch(e.target.value)}
            name="store"
            placeholder="Choose store"
            value={storeSearch}
          ></input>
          <span></span>
          <div className={storeExpand ? `${s.expand} ${s.active}` : s.expand}>
            {cities.map((city) => (
              <p
                onClick={() => {
                  setStore(city);
                  setStoreSearch(city);
                  setStoreExpand(false);
                }}
                key={city}
              >
                {city}
              </p>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Store;
