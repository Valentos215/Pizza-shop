import s from "./Checkout.module.scss";
import Order from "./Order/Order";

const Checkout = () => {
  return (
    <div className="container">
      <div className={s.wrapper}>
        <Order />
      </div>
    </div>
  );
};

export default Checkout;
