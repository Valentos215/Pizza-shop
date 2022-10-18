import { useContext, useEffect } from 'react';

import { CartContext } from 'contexts/cartContext';
import useLocalStorage from 'shared/hooks/useLocalStorage';

const CartChecker = ({ children }: any) => {
  const [cart, setCart] = useContext(CartContext);
  const [localCart, setLocalCart] = useLocalStorage('cart');

  useEffect(() => {
    if (localCart) setCart(JSON.parse(localCart));
  }, []);

  useEffect(() => {
    if (!cart) return;
    setLocalCart(JSON.stringify(cart));
  }, [cart, setLocalCart]);

  return children;
};

export default CartChecker;
