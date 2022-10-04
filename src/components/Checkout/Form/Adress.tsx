import { useEffect, useState } from "react";
import s from "./Adress.module.scss";
import CityAutocomplete from "./Autocomplete/CityAutocomplete";
import StreetAutocomplete from "./Autocomplete/StreetAutocomplete";

type City = { id: string; slug: string; stores: string[]; bbox: string[] };
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
  const [city, setCity] = useState<City | null>(null);
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [apartment, setApartment] = useState("");
  const [entrance, setEntrance] = useState("");

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
      <h3>Adress</h3>
      <form className={s.form}>
        <CityAutocomplete
          city={city}
          setCity={setCity}
          check={check}
          setCheck={setCheck}
        />
        <StreetAutocomplete
          city={city}
          street={street}
          setStreet={setStreet}
          check={check}
          setCheck={setCheck}
        />
        <div className={s.form__row}>
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
