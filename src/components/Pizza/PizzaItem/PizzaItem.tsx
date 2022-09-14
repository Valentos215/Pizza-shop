import s from "./PizzaItem.module.scss";
import { useContext, useState } from "react";
import cartLogo from "../../../assets/Cart.svg";
import { CartContext } from "../../../contexts/cartContext";
import { compareItems } from "../../../utils";

type pizza = {
  pizza: {
    id: 1;
    img: string;
    title: string;
    description: string;
    ingredients: string[];
    baseCost: number;
    popularity: number;
  };
};

const PizzaItem = ({ pizza }: pizza) => {
  const sizes = ["Standard size", "Large", "New Yorker"];
  const crusts = ["Standard crust", "Thin", "Philadelphia", "Hot-Dog Crust"];
  const weight = [560, 750, 810];
  const [currentSize, setCurrentSize] = useState(sizes[0]);
  const [currentCrust, setCurrentCrust] = useState(crusts[0]);
  const [cart, setCart] = useContext(CartContext);

  const count = (): number => {
    let counter = 0;
    cart.forEach((item) => {
      if (
        item.id === pizza.id &&
        item.size === currentSize &&
        item.crust === currentCrust
      ) {
        counter = item.number;
      }
    });
    return counter;
  };

  const amount = () => {
    const sizeRate = () => {
      if (currentSize === sizes[1]) return 1.18;
      if (currentSize === sizes[2]) return 1.32;
      return 1;
    };
    const crustRate = () => {
      if (currentCrust === crusts[2]) return 1.2;
      if (currentCrust === crusts[3]) return 1.24;
      return 1;
    };
    return Math.ceil(pizza.baseCost * sizeRate() * crustRate());
  };

  const sizeClick = (size: string) => {
    setCurrentSize(size);
    setCurrentCrust(crusts[0]);
  };

  const crustClick = (crust: string) => {
    if (currentSize !== sizes[2]) {
      setCurrentCrust(crust);
    } else {
      if (crust === crusts[0] || crust === crusts[1]) {
        setCurrentCrust(crust);
      }
    }
  };

  const toCartClick = () => {
    setCart([
      ...cart,
      {
        id: pizza.id,
        title: pizza.title,
        img: pizza.img,
        size: currentSize,
        crust: currentCrust,
        ingredients: pizza.ingredients,
        number: 1,
        amount: amount(),
      },
    ]);
  };

  const onMinusClick = () => {
    setCart(
      cart
        .filter(
          (item) =>
            !(
              compareItems(item, pizza, currentSize, currentCrust) &&
              item.number === 1
            )
        )
        .map((item) => {
          if (compareItems(item, pizza, currentSize, currentCrust)) {
            return { ...item, number: item.number - 1 };
          }
          return item;
        })
    );
  };

  const onPlusClick = () => {
    setCart(
      cart.map((item) => {
        if (compareItems(item, pizza, currentSize, currentCrust)) {
          if (item.number < 99) return { ...item, number: item.number + 1 };
        }
        return item;
      })
    );
  };

  const crustClasses = (crust: string) => {
    if (crust === currentCrust) {
      return `${s.crust__checked}`;
    }
    if (currentSize === sizes[2]) {
      if (crust === crusts[2] || crust === crusts[3]) {
        return `${s.crust__disabled}`;
      }
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.image}>
        <img className={s.image__main} src={pizza.img} alt=""></img>
        {cart.some((item) => item.id === pizza.id) && (
          <img className={s.image__cartLogo} src={cartLogo} alt=""></img>
        )}
        <span>{weight[sizes.indexOf(currentSize)]}g</span>
      </div>
      <div className={s.title}>{"Pizza " + pizza.title}</div>
      <div className={s.ingredients}>
        {pizza.description && <span>({pizza.description}), </span>}
        {pizza.ingredients.join(", ")}
        <p>You can remove the ingredients at checkout</p>
      </div>
      <div className={s.size}>
        {sizes.map((size) => (
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
      <div className={s.crust}>
        {crusts.map((crust) => (
          <span
            key={crust}
            onClick={() => crustClick(crust)}
            className={crustClasses(crust)}
          >
            {crust}
          </span>
        ))}
      </div>
      <div className={s.checkout}>
        <div className={s.checkout__amount}>
          {amount() * (count() || 1)}
          <span> uah</span>
        </div>
        {!count() && (
          <div className={s.checkout__tocartButton} onClick={toCartClick}>
            To cart
          </div>
        )}
        {count() > 0 && (
          <div className={s.checkout__count}>
            <div
              onClick={onMinusClick}
              className={`${s.checkout__count_button} ${s.minus}`}
            ></div>
            <span>{("0" + count()).slice(-2)}</span>
            <div
              onClick={onPlusClick}
              className={`${s.checkout__count_button} ${s.plus}`}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PizzaItem;
