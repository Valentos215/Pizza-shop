import s from "./Checkout.module.scss";
import Order from "./Order/Order";

const Checkout = () => {
  return (
    <div className={s.wrapper}>
      <Order />
    </div>
  );
};

export default Checkout;
