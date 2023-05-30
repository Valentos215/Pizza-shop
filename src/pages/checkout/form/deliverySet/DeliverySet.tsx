import { memo } from 'react';

import deliveryLogo from 'assets/Delivery.svg';
import carryOutLogo from 'assets/CarryOut.svg';

import s from 'pages/checkout/form/deliverySet/DeliverySet.module.scss';

interface IDeliverySetProps {
  delivery: boolean;
  setDelivery: (value: boolean) => void;
}

const DeliverySet = memo(({ delivery, setDelivery }: IDeliverySetProps) => {
  const deliveryClassName = delivery ? `${s.delivery__item} ${s.active}` : s.delivery__item;
  const carryOutClassName = delivery ? s.delivery__item : `${s.delivery__item} ${s.active}`;

  return (
    <div className={s.delivery}>
      <div className={deliveryClassName} onClick={() => setDelivery(true)}>
        <img src={deliveryLogo} alt="Delivery logo" />
        <span>Delivery</span>
      </div>
      <div className={carryOutClassName} onClick={() => setDelivery(false)}>
        <img src={carryOutLogo} alt="CarryOut logo" />
        <span>Carry out</span>
      </div>
    </div>
  );
});

export default DeliverySet;
