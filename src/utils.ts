type CartItem = {
  id: number;
  size: string;
  crust?: string;
  title: string;
  img: string;
  ingredients?: string[];
  number: number;
  amount: number;
};

export const compareItems = (
  item1: CartItem,
  item2: CartItem,
  size?: string,
  crust?: string
) => {
  if (item1.crust) {
    return (
      item1.id === item2.id &&
      item1.size === (item2.size || size) &&
      item1.crust === (item2.crust || crust)
    );
  }
  if (item1.size) {
    return item1.id === item2.id && item1.size === (item2.size || size);
  }
  return item1.id === item2.id;
};

export const minusItem = (
  cart: CartItem[],
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>,
  item: CartItem
) => {
  setCart(
    cart
      .filter((i) => !(compareItems(i, item) && i.number === 1))
      .map((i) => {
        if (compareItems(i, item)) {
          return { ...i, number: i.number - 1 };
        }
        return i;
      })
  );
};

export const plusItem = (
  cart: CartItem[],
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>,
  item: CartItem
) => {
  setCart(
    cart.map((i) => {
      if (compareItems(i, item)) {
        return { ...i, number: i.number + 1 };
      }
      return i;
    })
  );
};

export const removeItem = (
  cart: CartItem[],
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>,
  item: CartItem
) => {
  setCart(cart.filter((i) => !compareItems(i, item)));
};
