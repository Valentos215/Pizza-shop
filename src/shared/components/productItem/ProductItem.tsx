import { useContext, useState, memo } from 'react';

import cartLogo from 'assets/Cart.svg';
import { CartContext } from 'contexts/cartContext';
import Show from 'shared/components/show/Show';
import { minusItem, plusItem } from 'utils/utils';
import { ICartItem } from 'shared/components/cartItem/utils/cartItem.utils';
import { IProduct } from '@pages/products/utils/products.utils';

import s from 'shared/components/productItem/ProductItem.module.scss';

interface IProductItemProps {
  product: IProduct;
}

const ProductItem = memo(({ product }: IProductItemProps) => {
  const { id, size, title, img, weight, cost } = product;
  const [currentSize, setCurrentSize] = useState(size[0]);
  const [cart, setCart] = useContext(CartContext);

  const currentCost = cost[size.indexOf(currentSize)];
  const currentWeight = weight ? weight[size.indexOf(currentSize)] : null;

  const getCount = (): number => {
    let counter = 0;

    cart.forEach((item) => {
      const { id, size, number } = item;

      if (id === product.id && size === currentSize) {
        counter = number;
      }
    });

    return counter;
  };

  const currentItem: ICartItem = {
    ...product,
    size: currentSize,
    number: getCount(),
    amount: currentCost,
  };

  const onSizeClick = (size: string) => {
    setCurrentSize(size);
  };

  const onCartClick = () => {
    setCart([
      ...cart,
      {
        id,
        title,
        img,
        size: currentSize,
        number: 1,
        amount: currentCost,
      },
    ]);
  };

  const totalAmount = currentItem.amount * (currentItem.number || 1);

  const productInCart = cart.some((item) => item.id === id);

  const sizeClassName = (size: string) => (size === currentSize ? s.size__checked : '');

  return (
    <div className={s.wrapper}>
      <div className={s.image}>
        <img className={s.image__main} src={img} alt="" />
        <Show condition={productInCart}>
          <img className={`${s.image__cartLogo} ${s.dark}`} src={cartLogo} alt="" />
        </Show>
        {!!currentWeight && <span>{currentWeight}g</span>}
      </div>
      <div className={s.title}>{title}</div>
      <div className={s.size}>
        {size.map((size) => (
          <span key={size} onClick={() => onSizeClick(size)} className={sizeClassName(size)}>
            {size}
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

export default ProductItem;
