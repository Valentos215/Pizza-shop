import React from 'react';

import { createContext, useState } from 'react';
import { ICartItem } from 'shared/components/cartItem/utils/cartItem.utils';

export const CartContext = createContext<
  [ICartItem[], React.Dispatch<React.SetStateAction<ICartItem[]>>]
>([[], () => []]);
export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<ICartItem[]>([]);
  return <CartContext.Provider value={[cart, setCart]}>{children}</CartContext.Provider>;
};
