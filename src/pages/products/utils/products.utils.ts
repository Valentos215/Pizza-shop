export interface IProduct {
  id: number;
  title: string;
  img: string;
  category: string;
  size: string[];
  cost: number[];
  weight: number[];
}

interface IProductsToShowParams {
  products: IProduct[] | null;
  filter: string[] | null;
  sort: number;
}

type TProductsToShowResult = IProduct[] | null;

export const productsToShow = ({
  products,
  filter,
  sort,
}: IProductsToShowParams): TProductsToShowResult => {
  if (!products) {
    return null;
  }

  let filtered: IProduct[];

  if (filter) {
    filtered = products.filter((product: IProduct) =>
      filter.some((cat) => product.category === cat),
    );
  } else {
    filtered = products;
  }

  if (sort === -1) {
    return filtered;
  }

  if (sort === 0) return filtered.sort((a, b) => a.cost[0] - b.cost[0]);

  if (sort === 1) return filtered.sort((a, b) => b.cost[0] - a.cost[0]);

  return null;
};
