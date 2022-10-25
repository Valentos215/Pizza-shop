import { useContext, useState, memo } from 'react';

import cartLogo from 'assets/Cart.svg';
import { CartContext } from 'contexts/cartContext';
import Show from 'shared/components/show/Show';
import { minusItem, plusItem } from 'utils/utils';
import { ICartItem } from 'shared/components/cartItem/utils/cartItem.utils';
import { PIZZA_SIZES, PIZZA_CRUSTS, PIZZA_WEIGHT } from 'constants/index';
import { IPizza } from '@pages/pizza/utils/pizza.utils';
import { getAmount, getCount } from './utils/pizzaItem.utils';

import s from 'shared/components/productItem/ProductItem.module.scss';

interface IPizzaItemProps {
  pizza: IPizza;
}

const PizzaItem = memo(({ pizza }: IPizzaItemProps) => {
  const { id, img, title, ingredients, description, baseCost, popularity } = pizza;
  const [currentSize, setCurrentSize] = useState(PIZZA_SIZES[0]);
  const [currentCrust, setCurrentCrust] = useState(PIZZA_CRUSTS[0]);
  const [cart, setCart] = useContext(CartContext);

  const currentItem: ICartItem = {
    ...pizza,
    size: currentSize,
    crust: currentCrust,
    number: getCount({ cart, currentSize, currentCrust, pizzaId: pizza.id }),
    amount: getAmount({ currentSize, currentCrust, baseCost }),
  };

  const onSizeClick = (size: string) => {
    setCurrentSize(size);
    setCurrentCrust(PIZZA_CRUSTS[0]);
  };

  const onCrustClick = (crust: string) => {
    if (currentSize !== PIZZA_SIZES[2]) {
      setCurrentCrust(crust);
    } else {
      if (crust === PIZZA_CRUSTS[0] || crust === PIZZA_CRUSTS[1]) {
        setCurrentCrust(crust);
      }
    }
  };

  const onCartClick = () => {
    setCart([
      ...cart,
      {
        id,
        title,
        img,
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
        <img className={s.image__main} src={img} alt="" />
        <Show condition={pizzaInCart}>
          <img className={s.image__cartLogo} src={cartLogo} alt="" />
        </Show>
        <span>{PIZZA_WEIGHT[PIZZA_SIZES.indexOf(currentSize)]}g</span>
      </div>
      <div className={s.title}>{title}</div>
      <div className={s.ingredients}>
        <Show condition={!!description}>
          <span>({description}), </span>
        </Show>
        {ingredients.join(', ')}
        <p>You can remove some ingredients at checkout</p>
      </div>
      <div className={s.size}>
        {PIZZA_SIZES.map((size) => (
          <span key={size} onClick={() => onSizeClick(size)} className={sizeClassName(size)}>
            {size}
          </span>
        ))}
      </div>
      <div className={s.crust}>
        {PIZZA_CRUSTS.map((crust) => (
          <span key={crust} onClick={() => onCrustClick(crust)} className={crustClasses(crust)}>
            {crust}
          </span>
        ))}
      </div>
      {/*TODO: you have duplicate for this part in Product.tsx. Move this part to separate component and reuse */}
      <div className={s.checkout}>
        <div className={s.checkout__amount}>
          {totalAmount}
          <span> uah</span>
        </div>
        <Show condition={!currentItem.number}>
          <div className={s.checkout__tocartButton} onClick={onCartClick}>
            To cart
          </div>
        </Show>
        <Show condition={currentItem.number > 0}>
          <div className={s.checkout__count}>
            <div
              onClick={() => minusItem(cart, setCart, currentItem)}
              className={`${s.checkout__count_button} ${s.minus}`}
            />
            <span>{('0' + currentItem.number).slice(-2)}</span>
            <div
              onClick={() => plusItem(cart, setCart, currentItem)}
              className={`${s.checkout__count_button} ${s.plus}`}
            />
          </div>
        </Show>
      </div>
    </div>
  );
});

export default PizzaItem;
