import s from "./Pizza.module.scss";
import { useState, useEffect } from "react";
import Filter from "../sharedComponents/Filter/Filter";
import Sort from "../sharedComponents/Sort/Sort";
import PizzaItem from "../sharedComponents/ProductItem/PizzaItem";
import jsonData from "../../assets/pizzas.json";
import useLocalStorage from "../../hooks/useLocalStorage";

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
  const [filter, setFilter] = useState<string[]>([]);
  const [memInvert, setMemInvert] = useLocalStorage("invert");
  const [invert, setInvert] = useState(Number(memInvert) || 0);
  const [memSort, setMemSort] = useLocalStorage("sort");
  const [sort, setSort] = useState<number>(Number(memSort) || 0);
  const sortCriteria = ["Popularity", "Price low-high", "Price high-low"];
  const loadData = () => JSON.parse(JSON.stringify(jsonData));
  const [pizzas, setPizzas] = useState<pizza[]>(loadData());

  const ingredients = () => {
    let arr: string[] = [];
    pizzas.forEach((pizza: pizza) => {
      pizza.ingredients.forEach((ing) => {
        if (!arr.includes(ing)) arr.push(ing);
      });
    });
    return arr;
  };

  const filtered = () => {
    const filt = pizzas.filter((pizza: pizza) => {
      if (invert) {
        return filter.every((ing) => !pizza.ingredients.includes(ing));
      }
      return filter.some((ing) => pizza.ingredients.includes(ing));
    });
    if (filter[0]) {
      return filt;
    } else {
      return pizzas;
    }
  };

  const pizzasToShow = () => {
    let toShow: pizza[] = [];
    if (sort === 0)
      toShow = filtered().sort((a, b) => {
        return b.popularity - a.popularity;
      });
    if (sort === 1)
      toShow = filtered().sort((a, b) => {
        return a.baseCost - b.baseCost;
      });
    if (sort === 2)
      toShow = filtered().sort((a, b) => {
        return b.baseCost - a.baseCost;
      });
    return toShow;
  };

  useEffect(() => {
    setMemSort(String(sort));
  }, [sort, setMemSort]);
  useEffect(() => {
    setMemInvert(String(Number(invert) * 1));
  }, [invert, setMemInvert]);

  return (
    <div className="container">
      <div className={s.wrapper}>
        <div className={s.filters}>
          <Filter
            specification={ingredients()}
            setFilter={setFilter}
            invert={invert}
          />
          <Sort sortCriteria={sortCriteria} setSort={setSort} />
        </div>
        {filter[0] && (
          <div className={s.title}>
            Pizzas {!!invert && <span> no </span>} includes: {filter.join(", ")}{" "}
            <span
              onClick={() => setInvert(Math.abs(invert - 1))}
              className={s.invert}
            >
              Invert
            </span>
          </div>
        )}
        <div className={s.pizzaItems}>
          {pizzasToShow().map((pizza: pizza) => (
            <PizzaItem key={pizza.id} pizza={pizza} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pizza;
