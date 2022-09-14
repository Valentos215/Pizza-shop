import s from "./Cart.module.scss";
import { Link } from "react-router-dom";
import cartLogo from "../../../assets/Cart.svg";
import React, { useState, useContext } from "react";
import { CartContext } from "../../../contexts/cartContext";
import CartItem from "./CartItem";

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
  const totalNumber = () => {
    let total = 0;
    cart.forEach((item) => {
      total = total + item.number;
    });
    return `0${total}`.slice(-2);
  };

  return (
    <>
      <div className={`${s.cart}`}>
        <div
          className={s.viewer}
          tabIndex={1}
          onMouseEnter={(e) => e.currentTarget.focus()}
          onClick={() => {
            if (totalAmount()) setExpanded(!expanded);
          }}
        >
          <div className={s.counter}>
            <span>{totalNumber()}</span>
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
        {cart[0] && (
          <div
            tabIndex={2}
            onMouseEnter={(e) => e.currentTarget.focus()}
            onBlur={() => setExpanded(false)}
            className={expanded ? `${s.expand} ${s.active}` : s.expand}
          >
            {cart.map((item) => (
              <CartItem key={item.id + item.size + item.crust} item={item} />
            ))}
          </div>
        )}
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
