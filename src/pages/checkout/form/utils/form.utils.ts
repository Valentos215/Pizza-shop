export interface ICity {
  id: string;
  slug: string;
  stores: string[];
  bbox: string[];
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
