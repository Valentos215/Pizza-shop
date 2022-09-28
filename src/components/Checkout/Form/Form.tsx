import { useContext, useState } from "react";
import s from "./Form.module.scss";
import deliveryLogo from "../../../assets/Delivery.svg";
import carryOutLogo from "../../../assets/CarryOut.svg";
import Adress from "./Adress";
import { CartContext } from "../../../contexts/cartContext";
import { totalAmount } from "../../../utils";
import Store from "./Store";

const Form = () => {
  const [delivery, setDelivery] = useState(true);
  const [cart] = useContext(CartContext);
  const [check, setCheck] = useState(false);
  const [deliveryAdress, setDeliveryAdress] = useState();
  const [storeAdress, setStoreAdress] = useState<{
    city: string;
    store: string;
  } | null>(null);

  const disabled = (delivery && !deliveryAdress) || (!delivery && !storeAdress);

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
      {!delivery && (
        <Store
          setStoreAdress={setStoreAdress}
          check={check}
          setCheck={setCheck}
        />
      )}
      <textarea name="comment" rows={2} placeholder="Comment"></textarea>
      <div className={s.total}>
        <h3>Total</h3>
        <p>
          {totalAmount(cart)}.00<span> uah</span>
        </p>
        <div
          className={disabled ? `${s.button} ${s.disabled}` : s.button}
          onClick={() => setCheck(true)}
        >
          Checkout
        </div>
      </div>
    </div>
  );
};

export default Form;
