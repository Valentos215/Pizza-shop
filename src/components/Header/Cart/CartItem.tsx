import { useContext } from "react";
import { CartContext } from "../../../contexts/cartContext";
import s from "./CartItem.module.scss";
import { removeItem, minusItem, plusItem } from "../../../utils";

type cartItem = {
  item: {
    id: number;
    title: string;
    img: string;
    size: string;
    number: number;
    amount: number;
    crust?: string;
    ingredients?: string[];
  };
};

const CartItem = ({ item }: cartItem) => {
  const [cart, setCart] = useContext(CartContext);

  return (
    <div className={`${s.item}`}>
      <div className={s.item__head}>
        <h3>{item.title}</h3>
        <span onClick={() => removeItem(cart, setCart, item)}></span>
      </div>
      {item.ingredients && (
        <div className={s.item__ingredients}>{item.ingredients.join(", ")}</div>
      )}
      <div className={s.item__specification}>
        {item.size || null}
        {item.crust && `, ${item.crust}`}
      </div>
      <div className={s.item__total}>
        <div className={s.item__total_amount}>
          {item.amount * item.number}.00uah
        </div>
        <div className={s.item__total_counter}>
          <span onClick={() => minusItem(cart, setCart, item)}></span>
          <p>{item.number}</p>
          <span
            onClick={() => plusItem(cart, setCart, item)}
            className={s.plus}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
