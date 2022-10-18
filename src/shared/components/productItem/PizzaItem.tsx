import { useContext, useState, memo } from 'react';

import cartLogo from 'assets/Cart.svg';
import { CartContext } from 'contexts/cartContext';
import Show from '../show/Show';
import { minusItem, plusItem } from 'utils/utils';
import { ICartItem } from 'shared/components/cartItem/utils/cartItem.utils';
import { PIZZA_SIZES, PIZZA_CRUSTS, PIZZA_WEIGHT } from 'constants/index';

import s from './ProductItem.module.scss';
interface IPizzaItemProps {
  pizza: {
    id: number;
    title: string;
    img: string;
    description: string[];
    ingredients: string[];
    baseCost: number;
    popularity: number;
  };
}

const PizzaItem = memo(({ pizza }: IPizzaItemProps) => {
  const [currentSize, setCurrentSize] = useState(PIZZA_SIZES[0]);
  const [currentCrust, setCurrentCrust] = useState(PIZZA_CRUSTS[0]);
  const [cart, setCart] = useContext(CartContext);

  const count = (): number => {
    let counter = 0;
    cart.forEach((item) => {
      if (item.id === pizza.id && item.size === currentSize && item.crust === currentCrust) {
        counter = item.number;
      }
    });
    return counter;
  };

  const amount = () => {
    const sizeRate = () => {
      if (currentSize === PIZZA_SIZES[1]) return 1.18;
      if (currentSize === PIZZA_SIZES[2]) return 1.32;
      return 1;
    };
    const crustRate = () => {
      if (currentCrust === PIZZA_CRUSTS[2]) return 1.2;
      if (currentCrust === PIZZA_CRUSTS[3]) return 1.24;
      return 1;
    };
    return Math.ceil(pizza.baseCost * sizeRate() * crustRate());
  };

  const currentItem: ICartItem = {
    ...pizza,
    size: currentSize,
    crust: currentCrust,
    number: count(),
    amount: amount(),
  };

  const sizeClick = (size: string) => {
    setCurrentSize(size);
    setCurrentCrust(PIZZA_CRUSTS[0]);
  };

  const crustClick = (crust: string) => {
    if (currentSize !== PIZZA_SIZES[2]) {
      setCurrentCrust(crust);
    } else {
      if (crust === PIZZA_CRUSTS[0] || crust === PIZZA_CRUSTS[1]) {
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
        amount: currentItem.amount,
      },
    ]);
  };

  const totalAmount = currentItem.amount * (currentItem.number || 1);

  const pizzaInCart = cart.some((item) => item.id === pizza.id);

  const crustClasses = (crust: string) => {
    if (crust === currentCrust) {
      return `${s.crust__checked}`;
    }
    if (currentSize === PIZZA_SIZES[2]) {
      if (crust === PIZZA_CRUSTS[2] || crust === PIZZA_CRUSTS[3]) {
        return `${s.crust__disabled}`;
      }
    }
  };

  const sizeClassName = (size: string) => (size === currentSize ? s.size__checked : '');

  return (
    <div className={s.wrapper}>
      <div className={s.image}>
        <img className={s.image__main} src={pizza.img} alt=""></img>
        <Show condition={pizzaInCart}>
          <img className={s.image__cartLogo} src={cartLogo} alt="" />
        </Show>
        <span>{PIZZA_WEIGHT[PIZZA_SIZES.indexOf(currentSize)]}g</span>
      </div>
      <div className={s.title}>{pizza.title}</div>
      <div className={s.ingredients}>
        <Show condition={!!pizza.description}>
          <span>({pizza.description}), </span>
        </Show>
        {pizza.ingredients.join(', ')}
        <p>You can remove some ingredients at checkout</p>
      </div>
      <div className={s.size}>
        {PIZZA_SIZES.map((size) => (
          <span key={size} onClick={() => sizeClick(size)} className={sizeClassName(size)}>
            {size}
          </span>
        ))}
      </div>
      <div className={s.crust}>
        {PIZZA_CRUSTS.map((crust) => (
          <span key={crust} onClick={() => crustClick(crust)} className={crustClasses(crust)}>
            {crust}
          </span>
        ))}
      </div>
      <div className={s.checkout}>
        <div className={s.checkout__amount}>
          {totalAmount}
          <span> uah</span>
        </div>
        <Show condition={!currentItem.number}>
          <div className={s.checkout__tocartButton} onClick={toCartClick}>
            To cart
          </div>
        </Show>
        <Show condition={currentItem.number > 0}>
          <div className={s.checkout__count}>
            <div
              onClick={() => minusItem(cart, setCart, currentItem)}
              className={`${s.checkout__count_button} ${s.minus}`}
            ></div>
            <span>{('0' + currentItem.number).slice(-2)}</span>
            <div
              onClick={() => plusItem(cart, setCart, currentItem)}
              className={`${s.checkout__count_button} ${s.plus}`}
            ></div>
          </div>
        </Show>
      </div>
    </div>
  );
});

export default PizzaItem;
