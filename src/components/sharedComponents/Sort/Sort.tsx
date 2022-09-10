import s from "./Sort.module.scss";
import sortLogo from "../../../assets/Sort.svg";
import { useState } from "react";

type FilterProps = {
  sortCriteria: string[];
  setSort: React.Dispatch<React.SetStateAction<number>>;
};

const Sort = ({ sortCriteria, setSort }: FilterProps) => {
  const [expanded, setExpanded] = useState(false);

  const itemClick = (optionNum: number) => {
    setSort(optionNum);
    setExpanded(false);
  };

  return (
    <div className={s.sort} tabIndex={3} onBlur={() => setExpanded(false)}>
      <div
        className={s.button}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <span>Sort</span>
        <img src={sortLogo} alt=""></img>
      </div>
      <div className={expanded ? `${s.options} ${s.active}` : s.options}>
        {sortCriteria &&
          sortCriteria.map((option, i) => (
            <div key={option} className={s.option} onClick={() => itemClick(i)}>
              <p>{option.charAt(0).toUpperCase() + option.slice(1)}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sort;
