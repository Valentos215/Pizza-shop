import { useContext } from "react";
import { CartContext } from "../../../contexts/cartContext";
import s from "./CartItem.module.scss";
import {
  removeItem,
  minusItem,
  plusItem,
  removeIngredient,
} from "../../../utils/utils";

type cartItem = {
  id: number;
  title: string;
  img: string;
  size: string;
  number: number;
  amount: number;
  crust?: string;
  ingredients?: string[];
};
type CartItemProps = { item: cartItem; handle?: boolean };

const CartItem = ({ item, handle = false }: CartItemProps) => {
  const [cart, setCart] = useContext(CartContext);

  return (
    <div className={`${s.item}`}>
      <div className={s.item__head}>
        <h3>{item.title}</h3>
        <span onClick={() => removeItem(cart, setCart, item)}></span>
      </div>
      {item.ingredients && (
        <div className={s.item__ingredients}>
          {!handle && item.ingredients.join(", ")}
          {handle &&
            item.ingredients.length > 1 &&
            item.ingredients.map((ing) => (
              <div key={ing}>
                <p>{ing}</p>
                <span
                  onClick={() => removeIngredient(cart, setCart, item, ing)}
                ></span>
              </div>
            ))}
          {handle && item.ingredients.length === 1 && (
            <div className={s.last}>{item.ingredients[0]}</div>
          )}
        </div>
      )}
      <div className={s.item__specification}>
        {item.size}
        {item.crust && `, ${item.crust}`}
      </div>
      <div className={s.item__total}>
        <div className={s.item__total_amount}>
          {item.amount * item.number}.00<span> uah</span>
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
