import s from "./Pizza.module.scss";
import { useState, useEffect, useContext } from "react";
import Filter from "../sharedComponents/Filter/Filter";
import Sort from "../sharedComponents/Sort/Sort";
import PizzaItem from "../sharedComponents/ProductItem/PizzaItem";
import useLocalStorage from "../../hooks/useLocalStorage";
import useFetch from "../../hooks/useFetch";
import PizzaSkeleton from "../sharedComponents/ProductItem/PizzaSkeleton";
import { ExpandContext } from "../../contexts/expandContext";

type pizza = {
  id: number;
  title: string;
  img: string;
  description: string[];
  ingredients: string[];
  baseCost: number;
  popularity: number;
};

const Pizza = () => {
  const [filter, setFilter] = useState<string[] | null>(null);
  const [memInvert, setMemInvert] = useLocalStorage("invert");
  const [invert, setInvert] = useState(Number(memInvert) || 0);
  const [memSort, setMemSort] = useLocalStorage("sort");
  const [sort, setSort] = useState<number>(Number(memSort) || 0);
  const sortCriteria = ["Popularity", "Price low-high", "Price high-low"];
  const [pizzas, setPizzas] = useState<pizza[] | null>(null);
  const { isLoading, response, error, doFetch } = useFetch("pizza");
  const skeletons = Array.from({ length: 8 }, (v, k) => k + 1);
  const [expanded] = useContext(ExpandContext);

  const ingredients = () => {
    if (!pizzas) return null;
    let arr: string[] = [];
    pizzas.forEach((pizza: pizza) => {
      pizza.ingredients.forEach((ing) => {
        if (!arr.includes(ing)) arr.push(ing);
      });
    });
    return arr;
  };

  const pizzasToShow = () => {
    if (!pizzas) return null;
    let filtered: pizza[] = [];
    if (filter) {
      filtered = pizzas.filter((pizza: pizza) => {
        if (invert) {
          return filter.every((ing) => !pizza.ingredients.includes(ing));
        }
        return filter.some((ing) => pizza.ingredients.includes(ing));
      });
    } else {
      filtered = pizzas;
    }
    if (sort === 0)
      return filtered.sort((a, b) => {
        return b.popularity - a.popularity;
      });
    if (sort === 1)
      return filtered.sort((a, b) => {
        return a.baseCost - b.baseCost;
      });
    if (sort === 2)
      return filtered.sort((a, b) => {
        return b.baseCost - a.baseCost;
      });
  };

  const itemsList = pizzasToShow();

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!response) return;
    setPizzas(response);
  }, [response]);

  useEffect(() => {
    setMemSort(String(sort));
  }, [sort, setMemSort]);
  useEffect(() => {
    setMemInvert(String(Number(invert) * 1));
  }, [invert, setMemInvert]);

  return (
    <div className={expanded ? "container noScroll" : "container"}>
      <div className={s.wrapper}>
        <div className={s.filters}>
          <Filter
            specification={ingredients()}
            setFilter={setFilter}
            invert={invert}
          />
          <Sort sortCriteria={sortCriteria} setSort={setSort} />
        </div>
        {error && <h2>Something went wrong</h2>}
        {filter && (
          <div className={s.title}>
            Pizzas {!!invert ? "without" : "contains"} {filter.join(", ")}{" "}
            <span
              onClick={() => setInvert(Math.abs(invert - 1))}
              className={s.invert}
            >
              Invert
            </span>
          </div>
        )}
        <div className={s.pizzaItems}>
          {isLoading && skeletons.map((i) => <PizzaSkeleton key={i} />)}
          {itemsList &&
            itemsList.map((pizza: pizza) => (
              <PizzaItem key={pizza.id} pizza={pizza} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Pizza;
