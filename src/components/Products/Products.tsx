import s from "./Products.module.scss";
import { useState, useEffect } from "react";
import Filter from "../sharedComponents/Filter/Filter";
import Sort from "../sharedComponents/Sort/Sort";
import ProductItem from "../sharedComponents/ProductItem/ProductItem";
import useFetch from "../../hooks/useFetch";
import ProductSkeleton from "../sharedComponents/ProductItem/ProductSkeleton";

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
  const [products, setProducts] = useState<product[] | null>(null);
  const { isLoading, response, error, doFetch } = useFetch(match.path.slice(1));
  const skeletons = Array.from({ length: 8 }, (v, k) => k + 1);

  const categories = () => {
    if (!products) return null;
    let arr: string[] = [];
    products.forEach((product: product) => {
      if (!arr.includes(product.category)) arr.push(product.category);
    });
    return arr;
  };

  const productsToShow = () => {
    if (!products) return null;
    let filtered: product[] = [];
    const filt = products.filter((product: product) =>
      filter.some((cat) => product.category === cat)
    );
    if (filter[0]) {
      filtered = filt;
    } else {
      filtered = products;
    }
    if (sort === -1) {
      return filtered;
    }
    if (sort === 0)
      return filtered.sort((a, b) => {
        return a.cost[0] - b.cost[0];
      });
    if (sort === 1)
      return filtered.sort((a, b) => {
        return b.cost[0] - a.cost[0];
      });
  };
  const itemsList = productsToShow();

  useEffect(() => {
    setProducts(null);
    doFetch();
  }, [doFetch, match.path]);

  useEffect(() => {
    if (!response) return;
    setProducts(response);
  }, [response]);

  return (
    <div className="container">
      <div className={s.wrapper}>
        <div className={s.filters}>
          {products && products[0].category && (
            <Filter
              title="Category"
              specification={categories()}
              setFilter={setFilter}
              invert={0}
            />
          )}
          <p></p>
          <Sort sortCriteria={sortCriteria} setSort={setSort} />
        </div>
        {error && <h2>Something went wrong</h2>}
        {filter[0] && <div className={s.title}>{filter.join(", ")}</div>}
        <div className={s.pizzaItems}>
          {isLoading && skeletons.map((i) => <ProductSkeleton key={i} />)}
          {itemsList &&
            itemsList.map((product: product) => (
              <ProductItem key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
