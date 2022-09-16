import s from "./Header.module.scss";
import logo from "../../assets/Logo.svg";
import logoText from "../../assets/Logo_text.svg";
import { Link, NavLink } from "react-router-dom";
import Cart from "./Cart/Cart";
import ExpandedMenu from "./ExpandedMenu/ExpandedMenu";

type HeaderProps = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ expanded, setExpanded }: HeaderProps) => {
  const navMenu = [
    { title: "Pizza", link: "pizza" },
    { title: "Drinks", link: "drinks" },
    { title: "Sides", link: "sides" },
    { title: "Dessert", link: "dessert" },
  ];

  return (
    <>
      <div className={s.background}></div>
      <ExpandedMenu expanded={expanded} setExpanded={setExpanded} />
      <div className={s.header}>
        <div className="container">
          <div className={s.header__wrapper}>
            <Link
              to={"/"}
              className={s.header__logo}
              onClick={() => setExpanded(false)}
            >
              <img alt="" src={logo}></img>
              <img alt="" src={logoText}></img>
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
              <div onClick={() => setExpanded(false)}>
                <Cart />
              </div>
              <div
                className={expanded ? `${s.burger} ${s.active}` : s.burger}
                onClick={() => {
                  setExpanded(!expanded);
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
