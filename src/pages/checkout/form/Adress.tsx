import { useEffect, useState, memo } from 'react';

import CityAutocomplete from 'pages/checkout/form/autocomplete/CityAutocomplete';
import StreetAutocomplete from 'pages/checkout/form/autocomplete/StreetAutocomplete';
import { ICity, IDeliveryAdress } from 'pages/checkout/form/utils/form.utils';
import Show from 'shared/components/show/Show';

import s from './Adress.module.scss';
interface IAdressProps {
  setDeliveryAdress: (value: IDeliveryAdress | null) => void;
  check: boolean;
  setCheck: (value: boolean) => void;
}

const Adress = memo(({ setDeliveryAdress, check, setCheck }: IAdressProps) => {
  const [city, setCity] = useState<ICity | null>(null);
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');
  const [apartment, setApartment] = useState('');
  const [entrance, setEntrance] = useState('');

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

  const houseInputClassName = (check && !house && s.error) || '';

  return (
    <div className={s.adress}>
      <h3>Adress</h3>
      <form className={s.form}>
        <CityAutocomplete city={city} setCity={setCity} check={check} setCheck={setCheck} />
        <StreetAutocomplete
          city={city}
          street={street}
          setStreet={setStreet}
          check={check}
          setCheck={setCheck}
        />
        <div className={s.form__row}>
          <div className={`${s.form__input} ${s.margin}`}>
            <Show condition={!house && check}>
              <p className={s.error}>House number</p>
            </Show>
            <Show condition={!check || !!house}>
              <p>House</p>
            </Show>
            <input
              value={house}
              onChange={(e) => setHouse(e.target.value)}
              placeholder="House number"
              className={houseInputClassName}
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
});

export default Adress;
