export interface ICartItem {
  id: number;
  title: string;
  img: string;
  size: string;
  number: number;
  amount: number;
  crust?: string;
  ingredients?: string[];
}
