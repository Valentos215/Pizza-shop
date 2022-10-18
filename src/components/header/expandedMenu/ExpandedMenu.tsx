import { memo } from 'react';

import pizzaLogo from 'assets/Pizza.svg';
import drinksLogo from 'assets/Drinks.svg';
import sidesLogo from 'assets/Sides.svg';
import dessertLogo from 'assets/Dessert.svg';
import { Link } from 'react-router-dom';
import { ucFirst } from 'utils/utils';

import s from './ExpandedMenu.module.scss';
interface IExpandMenuProps {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
}

const ExpandedMenu = memo(({ expanded, setExpanded }: IExpandMenuProps) => {
  const menu = [
    { name: 'pizza', logo: pizzaLogo },
    { name: 'drinks', logo: drinksLogo },
    { name: 'sides', logo: sidesLogo },
    { name: 'dessert', logo: dessertLogo },
  ];

  const menuClassName = expanded ? `${s.menu} ${s.expanded}` : s.menu;

  return (
    <div className={menuClassName} onClick={() => setExpanded(false)}>
      <div className={s.menu__items}>
        {menu.map((item) => (
          <Link to={item.name} className={s.item} key={item.name}>
            <div className={s.item__wrapper}>
              <img src={item.logo} alt=""></img>
              <span>{ucFirst(item.name)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
});

export default ExpandedMenu;
