import s from "./Products.module.scss";
import { useState } from "react";
import Filter from "../sharedComponents/Filter/Filter";
import Sort from "../sharedComponents/Sort/Sort";
import ProductItem from "../sharedComponents/ProductItem/ProductItem";
import jsonDrinks from "../../assets/drinks.json";
import useFetch from "../../hooks/useFetch";

type product = {
  id: number;
  title: string;
  img: string;
  category: string;
  size: string[];
  cost: number[];
  weight: number[];
};

const Products = ({ match }: any) => {
  const [filter, setFilter] = useState<string[]>([]);
  const [sort, setSort] = useState<number>(-1);
  const sortCriteria = ["Price low-high", "Price high-low"];
  const loadData = () => JSON.parse(JSON.stringify(jsonDrinks));
  const [products, setProducts] = useState<product[]>(loadData());
  const { isLoading, response, error, doFetch } = useFetch(match.path.slice(1));

  const categories = () => {
    let arr: string[] = [];
    products.forEach((product: product) => {
      if (!arr.includes(product.category)) arr.push(product.category);
    });
    return arr;
  };

  const filtered = () => {
    const filt = products.filter((product: product) =>
      filter.some((cat) => product.category === cat)
    );
    if (filter[0]) {
      return filt;
    } else {
      return products;
    }
  };

  const productsToShow = () => {
    let toShow: product[] = [];
    if (sort === -1) return filtered();
    if (sort === 0)
      toShow = filtered().sort((a, b) => {
        return a.cost[0] - b.cost[0];
      });
    if (sort === 1)
      toShow = filtered().sort((a, b) => {
        return b.cost[0] - a.cost[0];
      });
    return toShow;
  };

  return (
    <div className="container">
      <div className={s.wrapper}>
        <div className={s.filters}>
          {products[0].category && (
            <Filter
              title="Category"
              specification={categories()}
              setFilter={setFilter}
              invert={0}
            />
          )}
          <Sort sortCriteria={sortCriteria} setSort={setSort} />
        </div>
        {filter[0] && <div className={s.title}>{filter.join(", ")}</div>}
        <div className={s.pizzaItems}>
          {productsToShow().map((product: product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
