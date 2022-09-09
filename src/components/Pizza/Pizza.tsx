import s from "./Pizza.module.scss";
import { useState } from "react";
import Filter from "../Filter/Filter";

const Pizza = () => {
  const [filter, setFilter] = useState<string[]>([]);
  const specification = ["cheeze", "meet", "corn", "pineaple"];

  return (
    <div className="container">
      <div className={s.wrapper}>
        <div className={s.filters}>
          <Filter specification={specification} setFilter={setFilter} />
        </div>
      </div>
    </div>
  );
};

export default Pizza;
