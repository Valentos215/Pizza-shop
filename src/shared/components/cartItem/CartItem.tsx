import { useContext, memo } from 'react';

import { CartContext } from 'contexts/cartContext';
import Show from 'shared/components/show/Show';
import { removeItem, minusItem, plusItem, removeIngredient } from 'utils/utils';
import { ICartItem } from 'shared/components/cartItem/utils/cartItem.utils';

import s from 'shared/components/cartItem/CartItem.module.scss';

interface ICartItemProps {
  item: ICartItem;
  handle?: boolean;
}

const CartItem = memo(({ item, handle = false }: ICartItemProps) => {
  const [, setCart] = useContext(CartContext);

  const itemTotalAmount = item.amount * item.number;

  return (
    <div className={s.item}>
      <div className={s.item__head}>
        <h3>{item.title}</h3>
        <span onClick={() => removeItem(setCart, item)} />
      </div>
      {!!item.ingredients && (
        <div className={s.item__ingredients}>
          <Show condition={!handle}>{item.ingredients.join(', ')}</Show>
          <Show condition={handle && item.ingredients.length > 1}>
            {item.ingredients.map((ing) => (
              <div key={ing}>
                <p>{ing}</p>
                <span onClick={() => removeIngredient(setCart, item, ing)} />
              </div>
            ))}
          </Show>
          <Show condition={handle && item.ingredients.length === 1}>
            <div className={s.last}>{item.ingredients[0]}</div>
          </Show>
        </div>
      )}
      <div className={s.item__specification}>
        {item.size}
        {item.crust && `, ${item.crust}`}
      </div>
      <div className={s.item__total}>
        <div className={s.item__total_amount}>
          {itemTotalAmount}.00<span> uah</span>
        </div>
        <div className={s.item__total_counter}>
          <span onClick={() => minusItem(setCart, item)} />
          <p>{item.number}</p>
          <span onClick={() => plusItem(setCart, item)} className={s.plus} />
        </div>
      </div>
    </div>
  );
});

export default CartItem;
