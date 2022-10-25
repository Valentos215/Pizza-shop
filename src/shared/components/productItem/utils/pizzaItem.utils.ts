import { PIZZA_CRUST_RATE } from 'constants/index';
import { PIZZA_CRUSTS } from 'constants/index';
import { PIZZA_SIZES } from 'constants/index';
import { PIZZA_SIZE_RATE } from 'constants/index';
import { ICartItem } from 'shared/components/cartItem/utils/cartItem.utils';

interface IGetCountParams {
  cart: ICartItem[];
  currentSize: string;
  currentCrust: string;
  pizzaId: number;
}

export const getCount = ({ cart, currentSize, currentCrust, pizzaId }: IGetCountParams): number => {
  let counter = 0;

  cart.forEach((item) => {
    const { id, size, crust, number } = item;

    if (id === pizzaId && size === currentSize && crust === currentCrust) {
      counter = number;
    }
  });

  return counter;
};

interface IGetAmountParams {
  currentSize: string;
  currentCrust: string;
  baseCost: number;
}

export const getAmount = ({ currentSize, currentCrust, baseCost }: IGetAmountParams) => {
  const sizeRate = PIZZA_SIZE_RATE[PIZZA_SIZES.indexOf(currentSize)];

  const crustRate = PIZZA_CRUST_RATE[PIZZA_CRUSTS.indexOf(currentCrust)];

  return Math.ceil(baseCost * sizeRate * crustRate);
};
