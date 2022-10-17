import s from "./ExpandedMenu.module.scss";
import React from "react";
import pizzaLogo from "assets/Pizza.svg";
import drinksLogo from "assets/Drinks.svg";
import sidesLogo from "assets/Sides.svg";
import dessertLogo from "assets/Dessert.svg";
import { Link } from "react-router-dom";

type ExpandMenuProps = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExpandedMenu = React.memo(
  ({ expanded, setExpanded }: ExpandMenuProps) => {
    const menu = [
      { name: "pizza", logo: pizzaLogo },
      { name: "drinks", logo: drinksLogo },
      { name: "sides", logo: sidesLogo },
      { name: "dessert", logo: dessertLogo },
    ];
    const ucFirst = (name: string) => {
      if (!name) return name;
      return name[0].toUpperCase() + name.slice(1);
    };

    return (
      <div
        className={expanded ? `${s.menu} ${s.expanded}` : s.menu}
        onClick={() => setExpanded(false)}
      >
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
  }
);

export default ExpandedMenu;
