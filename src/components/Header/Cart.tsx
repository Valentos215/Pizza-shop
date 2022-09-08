import s from "./Header.module.scss";
import { Link } from "react-router-dom";
import cartLogo from "../../assets/Cart.svg";

const Cart = () => {
  const amount = 215;
  return (
    <div className={s.cart}>
      <div className={s.counter}>
        <span>00</span>
        <img src={cartLogo} alt=""></img>
      </div>
      <div className={s.amount}>{amount && `${amount.toFixed(2)} uah`}</div>
      {amount ? (
        <div className={`${s.checkout} ${s.disabled}`}>Checkout</div>
      ) : (
        <Link className={s.checkout} to="cart">
          Checkout
        </Link>
      )}
    </div>
  );
};

export default Cart;
