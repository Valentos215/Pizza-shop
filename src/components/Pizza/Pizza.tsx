import s from "./Pizza.module.scss";
import { useState } from "react";
import Filter from "../sharedComponents/Filter/Filter";
import Sort from "../sharedComponents/Sort/Sort";
import PizzaItem from "./PizzaItem/PizzaItem";
import jsonData from "../../assets/pizzas.json";

type pizza = {
  id: 1;
  img: string;
  title: string;
  description: string;
  ingredients: string[];
  baseCost: number;
  popularity: number;
};

const Pizza = () => {
  const [filter, setFilter] = useState<string[]>([]);
  const [sort, setSort] = useState<number>(0);
  const sortCriteria = ["Popularity", "Price low-high", "Price high-low"];
  const loadData = () => JSON.parse(JSON.stringify(jsonData));
  const [pizzas, setPizzas] = useState<pizza[]>(loadData());

  const ingredients = () => {
    let arr: string[] = [];
    let data: any = {};
    pizzas.forEach((pizza: pizza) => {
      arr.concat(pizza.ingredients).forEach((ing) => {
        data[ing] = true;
      });
    });
    return Object.keys(data);
  };

  const filtered = () => {
    const filt = pizzas.filter((pizza: pizza) => {
      return pizza.ingredients.some((ing) => filter.includes(ing));
    });
    if (filt[0]) {
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

  return (
    <div className="container">
      <div className={s.wrapper}>
        <div className={s.filters}>
          <Filter specification={ingredients()} setFilter={setFilter} />
          <Sort sortCriteria={sortCriteria} setSort={setSort} />
        </div>
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
