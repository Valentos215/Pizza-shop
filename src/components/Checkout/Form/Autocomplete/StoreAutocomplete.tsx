import s from "./Autocomplete.module.scss";
import { useEffect, useState } from "react";

type City_type = { id: string; slug: string; stores: string[] };
type StoreProps = {
  city: City_type | null;
  store: string;
  setStore: React.Dispatch<React.SetStateAction<string>>;
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
};

const StoreAutocomplete = ({
  city,
  store,
  setStore,
  check,
  setCheck,
}: StoreProps) => {
  const [storeExpand, setStoreExpand] = useState(false);
  const [storeSearch, setStoreSearch] = useState("");

  const currentStores = city?.stores.filter((st: string) => {
    if (storeSearch)
      return st.toUpperCase().includes(storeSearch.toUpperCase());
    return st;
  });

  useEffect(() => {
    setStoreExpand(false);
  }, [store]);

  useEffect(() => {
    setStore("");
    setStoreSearch("");
  }, [city, setStore]);

  return (
    <div
      tabIndex={13}
      onFocus={() => {
        if (city) setStoreExpand(true);
      }}
      onBlur={() => setStoreExpand(false)}
      className={storeExpand ? `${s.wrapper} ${s.active}` : s.wrapper}
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
            <div
              className={s.expand__option}
              onClick={() => {
                setStore(store);
                setStoreSearch(store);
              }}
              key={store}
            >
              {store}
            </div>
          ))}
      </div>
    </div>
  );
};

export default StoreAutocomplete;
