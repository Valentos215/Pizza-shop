import s from "./Pizza.module.scss";
import { useState } from "react";
import Filter from "../sharedComponents/Filter/Filter";
import Sort from "../sharedComponents/Sort/Sort";

const Pizza = () => {
  const [filter, setFilter] = useState<string[]>([]);
  const ingredients = ["cheeze", "meet", "corn", "pineaple"];
  const [sort, setSort] = useState<number>(0);
  const sortCriteria = ["Popularity", "Price low-high", "Price high-low"];

  return (
    <div className="container">
      <div className={s.wrapper}>
        <div className={s.filters}>
          <Filter specification={ingredients} setFilter={setFilter} />
          <Sort sortCriteria={sortCriteria} setSort={setSort} />
        </div>
      </div>
    </div>
  );
};

export default Pizza;
