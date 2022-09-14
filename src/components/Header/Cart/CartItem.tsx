import { useContext } from "react";
import { CartContext } from "../../../contexts/cartContext";
import s from "./CartItem.module.scss";
import { compareItems } from "../../../utils";

type cartItem = {
  item: {
    id: number;
    title: string;
    img: string;
    size: string;
    crust: string;
    ingredients: string[];
    number: number;
    amount: number;
  };
};

const CartItem = ({ item }: cartItem) => {
  const [cart, setCart] = useContext(CartContext);

  const onRemoveClick = () => {
    setCart(cart.filter((i) => !compareItems(i, item)));
  };

  const onMinusClick = () => {
    setCart(
      cart
        .filter((i) => !(compareItems(i, item) && item.number === 1))
        .map((i) => {
          if (compareItems(i, item)) {
            return { ...i, number: i.number - 1 };
          }
          return i;
        })
    );
  };

  const onPlusClick = () => {
    setCart(
      cart.map((i) => {
        if (compareItems(i, item)) {
          return { ...i, number: i.number + 1 };
        }
        return i;
      })
    );
  };

  return (
    <div className={`${s.item}`}>
      <div className={s.item__head}>
        <h3>Pizza {item.title}</h3>
        <span onClick={onRemoveClick}></span>
      </div>
      <div className={s.item__ingredients}>
        {item.ingredients.join(", ") || null}
      </div>
      <div className={s.item__specification}>
        {item.size || null} {item.crust || null}
      </div>
      <div className={s.item__total}>
        <div className={s.item__total_amount}>
          {item.amount * item.number}.00uah
        </div>
        <div className={s.item__total_counter}>
          <span onClick={onMinusClick}></span>
          <p>{item.number}</p>
          <span onClick={onPlusClick} className={s.plus}></span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
