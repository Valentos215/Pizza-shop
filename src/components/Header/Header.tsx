import { useState } from "react";
import s from "./Header.module.scss";
import logo from "../../assets/Logo.svg";
import logoSmall from "../../assets/Logo_small.svg";
import { Link, NavLink } from "react-router-dom";
import Cart from "./Cart/Cart";

const Header = () => {
  const navMenu = [
    { title: "Pizza", link: "pizza" },
    { title: "Drinks", link: "drinks" },
    { title: "Sides", link: "sides" },
    { title: "Dessert", link: "dessert" },
  ];
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <div className={s.background}></div>
      <div className={s.header}>
        <div className="container">
          <div className={s.header__wrapper}>
            <Link to="/" className={s.header__logo}>
              <img alt="" src={logoSmall}></img>
              <img alt="" src={logo}></img>
            </Link>
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
            <div className={s.right_column}>
              <Cart />
              <div
                className={clicked ? `${s.burger} ${s.active}` : s.burger}
                onClick={() => {
                  setClicked(!clicked);
                }}
              >
                <span className={s.span}></span>
                <span className={s.span2}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
