type cartItem = {
  id: number;
  size?: string;
  crust?: string;
};

export const compareItems = (
  item1: cartItem,
  item2: cartItem,
  size?: string,
  crust?: string
) => {
  return (
    item1.id === item2.id &&
    item1.size === (item2.size || size) &&
    item1.crust === (item2.crust || crust)
  );
};
