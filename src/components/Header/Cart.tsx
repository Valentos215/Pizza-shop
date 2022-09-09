import s from "./Cart.module.scss";
import { Link } from "react-router-dom";
import cartLogo from "../../assets/Cart.svg";
import { useState } from "react";

const Cart = () => {
  const amount = 315;
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className={`${s.cart}`}>
        <div
          className={s.viewer}
          tabIndex={1}
          onBlur={() => {
            setExpanded(false);
          }}
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <div className={s.counter}>
            <span>00</span>
            <img src={cartLogo} alt=""></img>
          </div>
          {amount > 0 && (
            <label className={s.amount}>{`${amount}.00 uah`}</label>
          )}
        </div>
        {
          <Link
            className={amount ? s.checkout : `${s.checkout} ${s.disabled}`}
            to={amount ? "checkout" : "#"}
          >
            Checkout
          </Link>
        }
        <div className={expanded ? `${s.expand} ${s.active}` : s.expand}></div>
      </div>
      <div className={`${s.cart} ${s.small}`}>
        <Link to={amount ? "checkout" : "#"} className={s.viewer}>
          <div className={s.counter}>
            <span>00</span>
            <img src={cartLogo} alt=""></img>
          </div>
          {amount > 0 && (
            <label className={s.amount}>{`${amount}.00 uah`}</label>
          )}
        </Link>
      </div>
    </>
  );
};

export default Cart;
