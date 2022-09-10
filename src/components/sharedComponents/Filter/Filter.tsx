import s from "./Filter.module.scss";
import filterLogo from "../../../assets/Filter.svg";
import { useState } from "react";

type FilterProps = {
  specification: string[];
  setFilter: React.Dispatch<React.SetStateAction<string[]>>;
};

const Filter = ({ specification, setFilter }: FilterProps) => {
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);

  const isChecked = (option: string): boolean => {
    return checked.includes(option);
  };

  const checkboxClick = (option: string) => {
    if (isChecked(option)) {
      setChecked(checked.filter((opt) => opt !== option));
    } else {
      setChecked([...checked, option]);
    }
    setFilter(checked);
  };

  return (
    <div className={s.filter} tabIndex={2} onBlur={() => setExpanded(false)}>
      <div
        className={s.button}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <span>Filter</span>
        <img src={filterLogo} alt=""></img>
      </div>
      <div className={expanded ? `${s.options} ${s.active}` : s.options}>
        {specification &&
          specification.map((option) => (
            <div
              key={option}
              className={
                isChecked(option) ? `${s.option} ${s.checked}` : s.option
              }
              onClick={() => checkboxClick(option)}
            >
              <span></span>
              <p>{option.charAt(0).toUpperCase() + option.slice(1)}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Filter;
