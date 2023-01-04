import { useContext, memo } from 'react';

import { CartContext } from 'contexts/cartContext';
import Show from 'shared/components/show/Show';
import { minusItem, plusItem } from 'utils/utils';
import { ICartItem } from 'shared/components/cartItem/utils/cartItem.utils';

import s from 'shared/components/productItem/checkoutSection/CheckoutSection.module.scss';

interface ICheckoutSectionProps {
  currentItem: ICartItem;
}

const CheckoutSection = memo(({ currentItem }: ICheckoutSectionProps) => {
  const { id, title, img, size, crust, ingredients, amount, number } = currentItem;
  const [cart, setCart] = useContext(CartContext);

  const onCartClick = () => {
    if (crust) {
      setCart([...cart, { id, title, img, size, crust, ingredients, number: 1, amount }]);
    } else {
      setCart([...cart, { id, title, img, size, number: 1, amount }]);
    }
  };

  const totalAmount = amount * (number || 1);

  return (
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
            onClick={() => minusItem(setCart, currentItem)}
            className={`${s.checkout__count_button} ${s.minus}`}
          />
          <span>{('0' + currentItem.number).slice(-2)}</span>
          <div
            onClick={() => plusItem(setCart, currentItem)}
            className={`${s.checkout__count_button} ${s.plus}`}
          />
        </div>
      </Show>
    </div>
  );
});

export default CheckoutSection;
