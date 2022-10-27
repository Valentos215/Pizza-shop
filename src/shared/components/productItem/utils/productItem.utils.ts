import { ICartItem } from 'shared/components/cartItem/utils/cartItem.utils';

interface IGetProductCountParams {
  cart: ICartItem[];
  currentSize: string;
  productId: number;
}

export const getProductCount = ({
  cart,
  productId,
  currentSize,
}: IGetProductCountParams): number => {
  let counter = 0;

  cart.forEach((item) => {
    const { id, size, number } = item;

    if (id === productId && size === currentSize) {
      counter = number;
    }
  });

  return counter;
};
