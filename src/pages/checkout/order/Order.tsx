import { useContext, memo } from 'react';

import { CartContext } from 'contexts/cartContext';
import CartItem from 'shared/components/cartItem/CartItem';

import s from './Order.module.scss';

const Order = memo(() => {
  const [cart] = useContext(CartContext);

  if (!cart.length) {
    return null;
  }

  return (
    <div className={s.wrapper}>
      <div className={s.title}>Your order</div>
      <div className={s.order}>
        {cart
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <div key={item.id + item.id + item.size + item.crust} className={s.item}>
              <div className={s.image}>
                <img src={item.img} alt=""></img>
              </div>
              <div className={s.body}>
                <CartItem item={item} handle={true} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
});

export default Order;
