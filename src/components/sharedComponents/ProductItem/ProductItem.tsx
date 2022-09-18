import s from "./ProductItem.module.scss";
import { useContext, useState } from "react";
import cartLogo from "../../../assets/Cart.svg";
import { CartContext } from "../../../contexts/cartContext";
import { minusItem, plusItem } from "../../../utils";

type CartItem = {
  id: number;
  size: string;
  title: string;
  img: string;
  number: number;
  amount: number;
  crust?: string;
  ingredients?: string[];
};
type Product = {
  product: {
    id: number;
    title: string;
    img: string;
    category: string;
    size: string[];
    cost: number[];
    weight: number[];
  };
};

const ProductItem = ({ product }: Product) => {
  const [currentSize, setCurrentSize] = useState(product.size[0]);
  const [cart, setCart] = useContext(CartContext);

  const currentCost = product.cost[product.size.indexOf(currentSize)];
  const currentWeight = product.weight
    ? product.weight[product.size.indexOf(currentSize)]
    : null;

  const count = (): number => {
    let counter = 0;
    cart.forEach((item) => {
      if (item.id === product.id && item.size === currentSize) {
        counter = item.number;
      }
    });
    return counter;
  };

  const currentItem: CartItem = {
    ...product,
    size: currentSize,
    number: count(),
    amount: currentCost,
  };

  const sizeClick = (size: string) => {
    setCurrentSize(size);
  };

  const toCartClick = () => {
    setCart([
      ...cart,
      {
        id: product.id,
        title: product.title,
        img: product.img,
        size: currentSize,
        number: 1,
        amount: currentCost,
      },
    ]);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.image}>
        <img className={s.image__main} src={product.img} alt=""></img>
        {cart.some((item) => item.id === product.id) && (
          <img className={s.image__cartLogo} src={cartLogo} alt=""></img>
        )}
        {currentWeight && <span>{currentWeight}g</span>}
      </div>
      <div className={s.title}>{product.title}</div>
      <div className={s.size}>
        {product.size.map((size) => (
          <span
            key={size}
            onClick={() => {
              sizeClick(size);
            }}
            className={size === currentSize ? s.size__checked : ""}
          >
            {size}
          </span>
        ))}
      </div>
      <div className={s.checkout}>
        <div className={s.checkout__amount}>
          {currentItem.amount * (currentItem.number || 1)}
          <span> uah</span>
        </div>
        {!currentItem.number && (
          <div className={s.checkout__tocartButton} onClick={toCartClick}>
            To cart
          </div>
        )}
        {currentItem.number > 0 && (
          <div className={s.checkout__count}>
            <div
              onClick={() => minusItem(cart, setCart, currentItem)}
              className={`${s.checkout__count_button} ${s.minus}`}
            ></div>
            <span>{("0" + currentItem.number).slice(-2)}</span>
            <div
              onClick={() => plusItem(cart, setCart, currentItem)}
              className={`${s.checkout__count_button} ${s.plus}`}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
