import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import s from 'components/header/Header.module.scss';
import logo from 'assets/Logo.svg';
import logoText from 'assets/Logo_text.svg';
import Cart from 'components/header/cart/Cart';
import ExpandedMenu from 'components/header/expandedMenu/ExpandedMenu';
import { ExpandContext } from 'contexts/expandContext';
import { ERouterLink, NAV_MENU } from 'constants/index';

const Header = React.memo(() => {
  const [expanded, setExpanded] = useContext(ExpandContext);

  return (
    <>
      <ExpandedMenu expanded={expanded} setExpanded={setExpanded} />
      <div className={s.header}>
        <div className="container">
          <div className={s.header__wrapper}>
            <Link
              to={ERouterLink.Root}
              className={s.header__logo}
              onClick={() => setExpanded(false)}
            >
              <img alt="" src={logo} />
              <img alt="" src={logoText} />
            </Link>
            <div className={s.nav}>
              {NAV_MENU.map((item) => (
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
});

export default Header;
