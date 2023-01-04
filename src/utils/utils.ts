interface ICartItem {
  id: number;
  size: string;
  crust?: string;
  title: string;
  img: string;
  ingredients?: string[];
  number: number;
  amount: number;
}

export const compareItems = (item1: ICartItem, item2: ICartItem, size?: string, crust?: string) => {
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

export const minusItem = (setCart: any, item: ICartItem) => {
  setCart((prevCart: ICartItem[]) => {
    return prevCart
      .filter((i) => !(compareItems(i, item) && i.number === 1))
      .map((i) => {
        if (compareItems(i, item)) {
          return { ...i, number: i.number - 1 };
        }
        return i;
      });
  });
};

export const plusItem = (setCart: any, item: ICartItem) => {
  setCart((prevCart: ICartItem[]) => {
    return prevCart.map((i) => {
      if (compareItems(i, item) && i.number < 99) {
        return { ...i, number: i.number + 1 };
      }
      return i;
    });
  });
};

export const removeItem = (setCart: any, item: ICartItem) => {
  setCart((prevCart: ICartItem[]) => prevCart.filter((i) => !compareItems(i, item)));
};

export const removeIngredient = (setCart: any, item: ICartItem, ingredient: string) => {
  setCart((prevCart: ICartItem[]) => {
    return prevCart.map((product) => {
      if (compareItems(product, item)) {
        let newIngs = item.ingredients?.filter((ing) => ing !== ingredient);
        return { ...product, ingredients: newIngs };
      }
      return product;
    });
  });
};

export const totalAmount = (cart: ICartItem[]) => {
  let total = 0;
  cart.forEach((item) => {
    total = total + item.amount * item.number;
  });
  return total;
};

export const totalNumber = (cart: ICartItem[]) => {
  let total = 0;
  cart.forEach((item) => {
    total = total + item.number;
  });
  return `0${total}`.slice(-2);
};

export const ucFirst = (name: string) => {
  if (!name) {
    return '';
  }
  return name[0].toUpperCase() + name.slice(1);
};

export const range = (length: number) => Array.from({ length: length }, (v, k) => k + 1);
