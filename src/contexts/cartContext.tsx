import React from "react";
import { createContext, useState } from "react";

type cartItem = {
  id: number;
  title: string;
  img: string;
  size: string;
  crust: string;
  ingredients: string[];
  number: number;
  amount: number;
};

export const CartContext = createContext<
  [cartItem[], React.Dispatch<React.SetStateAction<cartItem[]>>]
>([[], () => []]);
export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<cartItem[]>([]);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};
