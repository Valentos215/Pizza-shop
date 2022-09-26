import s from "./Checkout.module.scss";
import Form from "./Form/Form";
import Order from "./Order/Order";

const Checkout = () => {
  return (
    <div className="container">
      <div className={s.wrapper}>
        <Order />
        <Form />
      </div>
    </div>
  );
};

export default Checkout;
