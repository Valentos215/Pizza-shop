import { useState } from "react";
import s from "./Form.module.scss";
import deliveryLogo from "../../../assets/Delivery.svg";
import carryOutLogo from "../../../assets/CarryOut.svg";
import Adress from "./Adress";

const Form = () => {
  const [delivery, setDelivery] = useState(true);

  return (
    <div className={s.wrapper}>
      <h3>Checkout order</h3>
      <div className={s.delivery}>
        <div
          className={
            delivery ? `${s.delivery__item} ${s.active}` : s.delivery__item
          }
          onClick={() => setDelivery(true)}
        >
          <img src={deliveryLogo} alt=""></img>
          <span>Delivery</span>
        </div>
        <div
          className={
            delivery ? s.delivery__item : `${s.delivery__item} ${s.active}`
          }
          onClick={() => setDelivery(false)}
        >
          <img src={carryOutLogo} alt=""></img>
          <span>Cerry out</span>
        </div>
      </div>
      <h3>Contacts</h3>
      <form className={s.contacts}>
        <input name="firstName" placeholder="First name"></input>
        <input name="phone" placeholder="Phone"></input>
        <input name="email" placeholder="E-mail"></input>
      </form>
      {delivery && <Adress />}
    </div>
  );
};

export default Form;
