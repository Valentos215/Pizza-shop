export interface ICartItem {
  id: string;
  title: string;
  imgUrl: string;
  size: string;
  number: number;
  amount: number;
  crust?: string;
  ingredients?: string[];
}
