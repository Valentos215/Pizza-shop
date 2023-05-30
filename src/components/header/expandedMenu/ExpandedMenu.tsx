import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ucFirst } from 'utils/utils';
import { NAV_MENU } from 'constants/index';

import s from './ExpandedMenu.module.scss';
interface IExpandMenuProps {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
}

const ExpandedMenu = memo(({ expanded, setExpanded }: IExpandMenuProps) => {
  const menuClassName = expanded ? `${s.menu} ${s.expanded}` : s.menu;

  return (
    <div className={menuClassName} onClick={() => setExpanded(false)}>
      <nav className={s.menu__items}>
        {NAV_MENU.map((item) => (
          <Link to={item.title} className={s.item} key={item.title}>
            <div className={s.item__wrapper}>
              <img src={item.logo} alt=""></img>
              <span>{ucFirst(item.title)}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
});

export default ExpandedMenu;
