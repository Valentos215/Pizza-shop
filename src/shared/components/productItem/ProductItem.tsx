import { useContext, useState, memo } from 'react';

import cartLogo from 'assets/Cart.svg';
import { CartContext } from 'contexts/cartContext';
import Show from 'shared/components/show/Show';
import { minusItem, plusItem } from 'utils/utils';
import { ICartItem } from 'shared/components/cartItem/utils/cartItem.utils';

import s from './ProductItem.module.scss';

interface IProductItemProps {
  product: {
    id: number;
    title: string;
    img: string;
    category: string;
    size: string[];
    cost: number[];
    weight: number[];
  };
}

const ProductItem = memo(({ product }: IProductItemProps) => {
  const [currentSize, setCurrentSize] = useState(product.size[0]);
  const [cart, setCart] = useContext(CartContext);

  const currentCost = product.cost[product.size.indexOf(currentSize)];
  const currentWeight = product.weight ? product.weight[product.size.indexOf(currentSize)] : null;

  const count = (): number => {
    let counter = 0;
    cart.forEach((item) => {
      if (item.id === product.id && item.size === currentSize) {
        counter = item.number;
      }
    });
    return counter;
  };

  const currentItem: ICartItem = {
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

  const totalAmount = currentItem.amount * (currentItem.number || 1);

  const productInCart = cart.some((item) => item.id === product.id);

  const sizeClassName = (size: string) => (size === currentSize ? s.size__checked : '');

  return (
    <div className={s.wrapper}>
      <div className={s.image}>
        <img className={s.image__main} src={product.img} alt=""></img>
        <Show condition={productInCart}>
          <img className={`${s.image__cartLogo} ${s.dark}`} src={cartLogo} alt="" />
        </Show>
        {!!currentWeight && <span>{currentWeight}g</span>}
      </div>
      <div className={s.title}>{product.title}</div>
      <div className={s.size}>
        {product.size.map((size) => (
          <span key={size} onClick={() => sizeClick(size)} className={sizeClassName(size)}>
            {size}
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

export default ProductItem;
