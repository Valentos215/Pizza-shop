import { memo, useContext } from 'react';

import { CartContext } from 'contexts/cartContext';
import Preloader from 'shared/components/preloader/Preloader';
import Show from 'shared/components/show/Show';
import { totalAmount } from 'utils/utils';

import s from 'pages/checkout/form/total/Total.module.scss';

interface ITotalProps {
  isLoading: boolean;
  addressError: boolean;
  isValid: boolean;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
}

const Total = memo(({ isLoading, addressError, isValid, handleSubmit }: ITotalProps) => {
  const [cart] = useContext(CartContext);

  const buttonClassName = addressError || !isValid ? `${s.button} ${s.disabled}` : s.button;

  return (
    <div className={s.total}>
      <Show condition={isLoading}>
        <div className={s.preloader}>
          <Preloader />
        </div>
      </Show>
      <h4>Total</h4>
      <p>
        {totalAmount(cart)}.00<span> uah</span>
      </p>
      <button disabled={isLoading} className={buttonClassName} onClick={() => handleSubmit}>
        Checkout
      </button>
    </div>
  );
});

export default Total;
