import { useEffect, memo, useState } from 'react';

import filterLogo from 'assets/Filter.svg';

import s from 'shared/components/filter/Filter.module.scss';
import Show from 'shared/components/show/Show';

interface IFilterProps {
  title?: string;
  specification: string[] | null;
  setFilter: (value: string[] | null) => void;
  invert: number;
}

const Filter = memo(({ title, specification, setFilter, invert }: IFilterProps) => {
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);

  // TODO: move to filter.utils
  const isChecked = (option: string): boolean => {
    return checked.includes(option);
  };

  // TODO: move to filter.utils
  const checkboxClick = (option: string) => {
    if (expanded && isChecked(option)) {
      setChecked(checked.filter((opt) => opt !== option));
    } else {
      setChecked([...checked, option]);
    }
  };

  // TODO: move to filter.utils
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
    if (checked[0]) {
      setFilter(checked);

      return;
    }

    setFilter(null);
  }, [checked, setFilter]);

  const expandedClassName = expanded ? `${s.options} ${s.active}` : s.options;

  return (
    <div className={s.filter} tabIndex={2} onBlur={() => setExpanded(false)}>
      <div
        className={s.button}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <span>{title ? title : 'Filter'}</span>
        <img src={filterLogo} alt="" />
      </div>
      <div className={expandedClassName}>
        <Show condition={!!specification}>
          {specification?.sort().map((option) => (
            <div key={option} className={s.option} onClick={() => checkboxClick(option)}>
              <span className={checkboxClasses(option)} />
              <p>{option.charAt(0).toUpperCase() + option.slice(1)}</p>
            </div>
          ))}
        </Show>
      </div>
    </div>
  );
});

export default Filter;
