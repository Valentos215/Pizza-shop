import { useState, useContext, memo } from 'react';

import { CartContext } from 'contexts/cartContext';
import { ExpandContext } from 'contexts/expandContext';
import Form from 'pages/checkout/form/Form';
import Order from 'pages/checkout/order/Order';

import s from 'pages/checkout/Checkout.module.scss';

const Checkout = memo(() => {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [cart] = useContext(CartContext);
  const [expanded] = useContext(ExpandContext);

  const scrollClassNames = expanded ? 'scroll off' : 'scroll';

  if (checkoutSuccess)
    return (
      <div className={s.title}>
        You have successfully placed an order, wait for the operator's call
      </div>
    );

  if (!cart.length) {
    return <div className={s.title}>Cart is empty</div>;
  }

  return (
    <div className={scrollClassNames}>
      <div className={'container'}>
        <main className={s.wrapper}>
          <Order />
          <Form setCheckoutSuccess={setCheckoutSuccess} />
        </main>
      </div>
    </div>
  );
});

export default Checkout;
