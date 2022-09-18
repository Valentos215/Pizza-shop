import { useEffect } from "react";
import s from "./Filter.module.scss";
import filterLogo from "../../../assets/Filter.svg";
import { useState } from "react";

type FilterProps = {
  title?: string;
  specification: string[] | null;
  setFilter: React.Dispatch<React.SetStateAction<string[]>>;
  invert: number;
};

const Filter = ({ title, specification, setFilter, invert }: FilterProps) => {
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);

  const isChecked = (option: string): boolean => {
    return checked.includes(option);
  };

  const checkboxClick = (option: string) => {
    if (!expanded) {
      return;
    }
    if (isChecked(option)) {
      setChecked(checked.filter((opt) => opt !== option));
    } else {
      setChecked([...checked, option]);
    }
  };

  const checkboxClasses = (option: string) => {
    if (!!invert) {
      if (isChecked(option)) {
        return `${s.checkbox} ${s.checkbox__denial} ${s.checkbox__denial_unchecked}`;
      } else {
        return `${s.checkbox} ${s.checkbox__denial}`;
      }
    } else {
      if (isChecked(option)) {
        return `${s.checkbox} ${s.checkbox__check} ${s.checkbox__check_checked}`;
      } else {
        return `${s.checkbox} ${s.checkbox__check}`;
      }
    }
  };

  useEffect(() => {
    setFilter(checked);
  }, [checked, setFilter]);

  return (
    <div className={s.filter} tabIndex={2} onBlur={() => setExpanded(false)}>
      <div
        className={s.button}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <span>{title ? title : "Filter"}</span>
        <img src={filterLogo} alt=""></img>
      </div>
      <div className={expanded ? `${s.options} ${s.active}` : s.options}>
        {specification &&
          specification.sort().map((option) => (
            <div
              key={option}
              className={s.option}
              onClick={() => checkboxClick(option)}
            >
              <span className={checkboxClasses(option)}></span>
              <p>{option.charAt(0).toUpperCase() + option.slice(1)}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Filter;
