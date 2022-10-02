import { useState, useContext } from "react";
import { CartContext } from "../../contexts/cartContext";
import s from "./Checkout.module.scss";
import Form from "./Form/Form";
import Order from "./Order/Order";

const Checkout = () => {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [cart] = useContext(CartContext);

  if (checkoutSuccess)
    return (
      <div className={s.title}>
        You have successfully placed an order, wait for the operator's call
      </div>
    );
  if (!cart[0]) {
    return <div className={s.title}>Cart is empty</div>;
  }

  return (
    <div className="container">
      <div className={s.wrapper}>
        <Order />
        <Form setCheckoutSuccess={setCheckoutSuccess} />
      </div>
    </div>
  );
};

export default Checkout;
