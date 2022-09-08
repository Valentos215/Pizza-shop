import s from "./Header.module.scss";
import logo from "../../assets/Logo.svg";
import logoSmall from "../../assets/Logo_small.svg";
import { NavLink } from "react-router-dom";

const Header = () => {
  const navMenu = [
    { title: "Pizza", link: "pizza" },
    { title: "Drinks", link: "drinks" },
    { title: "Sides", link: "sides" },
    { title: "Dessert", link: "dessert" },
  ];
  return (
    <div className={s.header}>
      <div className="container">
        <div className={s.header__wrapper}>
          <div className={s.header__logo}>
            <img alt="" src={logo}></img>
            <img alt="" src={logoSmall}></img>
          </div>
          <div className={s.nav}>
            {navMenu.map((item) => (
              <NavLink
                key={item.title}
                to={item.link}
                className={s.nav__link}
                activeClassName={s.active}
              >
                {item.title}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
