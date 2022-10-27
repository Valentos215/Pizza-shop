import { useEffect, memo, useState } from 'react';

import filterLogo from 'assets/Filter.svg';
import Show from 'shared/components/show/Show';
import { checkboxClasses, checkboxClick } from 'shared/components/filter/utils/filter.utils';

import s from 'shared/components/filter/Filter.module.scss';

interface IFilterProps {
  title?: string;
  specification: string[] | null;
  setFilter: (value: string[] | null) => void;
  invert: number;
}

const Filter = memo(({ title, specification, setFilter, invert }: IFilterProps) => {
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);

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
            <div
              key={option}
              className={s.option}
              onClick={() => checkboxClick({ option, checked, expanded, setChecked })}
            >
              <span className={checkboxClasses({ invert, option, checked, s })} />
              <p>{option.charAt(0).toUpperCase() + option.slice(1)}</p>
            </div>
          ))}
        </Show>
      </div>
    </div>
  );
});

export default Filter;
