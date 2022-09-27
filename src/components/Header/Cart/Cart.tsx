import s from "./Cart.module.scss";
import { Link } from "react-router-dom";
import cartLogo from "../../../assets/Cart.svg";
import { useState, useContext } from "react";
import { CartContext } from "../../../contexts/cartContext";
import CartItem from "./CartItem";
import { totalAmount, totalNumber } from "../../../utils";

const Cart = () => {
  const [expanded, setExpanded] = useState(false);
  const [cart] = useContext(CartContext);

  return (
    <>
      <div
        tabIndex={1}
        onBlur={() => setExpanded(false)}
        className={`${s.cart}`}
      >
        <div
          className={s.viewer}
          onClick={() => {
            if (cart[0]) setExpanded(!expanded);
          }}
        >
          <div className={s.counter}>
            <span>{totalNumber(cart)}</span>
            <img src={cartLogo} alt=""></img>
          </div>
          {cart[0] && (
            <label className={s.amount}>{`${totalAmount(cart)}.00 uah`}</label>
          )}
        </div>
        {
          <Link
            className={cart[0] ? s.checkout : `${s.checkout} ${s.disabled}`}
            to={cart[0] ? "checkout" : "#"}
          >
            Checkout
          </Link>
        }
        {cart[0] && (
          <div className={expanded ? `${s.expand} ${s.active}` : s.expand}>
            {cart
              .sort((a, b) => a.id - b.id)
              .map((item) => (
                <div
                  key={item.id + item.size + item.crust}
                  className={s.expand__item}
                >
                  <CartItem item={item} />
                </div>
              ))}
          </div>
        )}
      </div>
      <div className={`${s.cart} ${s.small}`}>
        <Link to={cart[0] ? "checkout" : "#"} className={s.viewer}>
          <div className={s.counter}>
            <span>00</span>
            <img src={cartLogo} alt=""></img>
          </div>
          {cart[0] && (
            <label className={s.amount}>{`${totalAmount(cart)}.00 uah`}</label>
          )}
        </Link>
      </div>
    </>
  );
};

export default Cart;
