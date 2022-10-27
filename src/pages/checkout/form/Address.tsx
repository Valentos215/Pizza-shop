import { useEffect, useState, memo } from 'react';

import CityAutocomplete from 'pages/checkout/form/autocomplete/CityAutocomplete';
import StreetAutocomplete from 'pages/checkout/form/autocomplete/StreetAutocomplete';
import { ICity, IDeliveryAdress } from 'pages/checkout/form/utils/form.utils';
import Show from 'shared/components/show/Show';

import s from 'pages/checkout/form/Adress.module.scss';

interface IAddressProps {
  setDeliveryAddress: (value: IDeliveryAdress | null) => void;
  shouldCheck: boolean;
  setShouldCheck: (value: boolean) => void;
}

const Address = memo(({ setDeliveryAddress, shouldCheck, setShouldCheck }: IAddressProps) => {
  const [city, setCity] = useState<ICity | null>(null);
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');
  const [apartment, setApartment] = useState('');
  const [entrance, setEntrance] = useState('');

  useEffect(() => {
    if (!city || !street || !house) {
      setDeliveryAddress(null);

      return;
    }

    setDeliveryAddress({
      city: city!.slug,
      street: street,
      house: house,
      apartment: apartment,
      entrance: entrance,
    });
  }, [city, street, house, apartment, entrance, setDeliveryAddress]);

  const houseInputClassName = (shouldCheck && !house && s.error) || '';

  return (
    <div className={s.adress}>
      <h3>Address</h3>
      <form className={s.form}>
        <CityAutocomplete
          city={city}
          setCity={setCity}
          shouldCheck={shouldCheck}
          setShouldCheck={setShouldCheck}
        />
        <StreetAutocomplete
          city={city}
          street={street}
          setStreet={setStreet}
          shouldCheck={shouldCheck}
          setShouldCheck={setShouldCheck}
        />
        <div className={s.form__row}>
          <div className={`${s.form__input} ${s.margin}`}>
            <Show condition={!house && shouldCheck}>
              <p className={s.error}>House number</p>
            </Show>
            <Show condition={!shouldCheck || !!house}>
              <p>House</p>
            </Show>
            <input
              value={house}
              onChange={(e) => setHouse(e.target.value)}
              placeholder="House number"
              className={houseInputClassName}
              onClick={() => setShouldCheck(false)}
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

export default Address;
