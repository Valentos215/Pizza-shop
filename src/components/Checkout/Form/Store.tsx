import s from "./Store.module.scss";
import { useEffect, useState } from "react";
import CityAutocomplete from "./Autocomplete/CityAutocomplete";
import StoreAutocomplete from "./Autocomplete/StoreAutocomplete";

type City_type = { id: string; slug: string; stores: string[]; bbox: string[] };
type StoreAdress = { city: string; store: string };
type StoreProps = {
  setStoreAdress: React.Dispatch<React.SetStateAction<StoreAdress | null>>;
  check: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
};

const Store = ({ setStoreAdress, check, setCheck }: StoreProps) => {
  const [city, setCity] = useState<City_type | null>(null);
  const [store, setStore] = useState("");

  useEffect(() => {
    if (!city || !store) {
      setStoreAdress(null);
    } else {
      setStoreAdress({ city: city!.slug, store: store });
    }
  }, [city, store, setStoreAdress]);

  return (
    <div className={s.store}>
      <h3>Store</h3>
      <form className={s.form}>
        <CityAutocomplete
          city={city}
          setCity={setCity}
          check={check}
          setCheck={setCheck}
        />
        <StoreAutocomplete
          city={city}
          store={store}
          setStore={setStore}
          check={check}
          setCheck={setCheck}
        />
      </form>
    </div>
  );
};

export default Store;
