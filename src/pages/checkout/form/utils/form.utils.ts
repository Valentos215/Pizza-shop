import { ICartItem } from 'shared/components/cartItem/utils/cartItem.utils';
export interface ICity {
  id: string;
  slug: string;
  stores: string[];
  bbox: string;
}

export interface IStoreAdress {
  city: string;
  store: string;
}

export interface IDeliveryAdress {
  city: string;
  street: string;
  house: string;
  apartment?: string;
  entrance?: string;
}

export interface IStreet {
  id: string;
  text: string;
}

export const parseJson = <T>(json: T): T => {
  return JSON.parse(JSON.stringify(json));
};

export const getSpecification = (item: ICartItem) => {
  if (item.crust) {
    const { size, crust, ingredients } = item;
    return { size, crust, ingredients };
  } else {
    return { size: item.size };
  }
};

export const getOrderList = (cart: ICartItem[]) => {
  return cart.map((item) => {
    return { id: item.id, quantity: item.number, specification: getSpecification(item) };
  });
};
