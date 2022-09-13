import s from "./Cart.module.scss";
import { Link } from "react-router-dom";
import cartLogo from "../../assets/Cart.svg";
import { useState, useContext } from "react";
import { CartContext } from "../../contexts/cartContext";

const Cart = () => {
  const [expanded, setExpanded] = useState(false);
  const [cart] = useContext(CartContext);
  const totalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      total = total + item.amount * item.number;
    });
    return total;
  };

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
            if (totalAmount()) setExpanded(!expanded);
          }}
        >
          <div className={s.counter}>
            <span>00</span>
            <img src={cartLogo} alt=""></img>
          </div>
          {totalAmount() > 0 && (
            <label className={s.amount}>{`${totalAmount()}.00 uah`}</label>
          )}
        </div>
        {
          <Link
            className={
              totalAmount() ? s.checkout : `${s.checkout} ${s.disabled}`
            }
            to={totalAmount() ? "checkout" : "#"}
          >
            Checkout
          </Link>
        }
        <div className={expanded ? `${s.expand} ${s.active}` : s.expand}></div>
      </div>
      <div className={`${s.cart} ${s.small}`}>
        <Link to={totalAmount() ? "checkout" : "#"} className={s.viewer}>
          <div className={s.counter}>
            <span>00</span>
            <img src={cartLogo} alt=""></img>
          </div>
          {totalAmount() > 0 && (
            <label className={s.amount}>{`${totalAmount()}.00 uah`}</label>
          )}
        </Link>
      </div>
    </>
  );
};

export default Cart;
