import React from "react";
import {NavLink, Link} from "react-router-dom"

export default function Header({onMenuClick, signedIn}) {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo"></div>
        {signedIn ? (
          <>
            <nav className="header__navigation">
              <NavLink
                to="/movies"
                className={({isActive}) => `header__navigation-link ${isActive ? "header__link_active" : ""}`}
              >
                Фильмы
              </NavLink>
              <NavLink
                to="/saved-movies"
                className={({isActive}) => `header__navigation-link ${isActive ? "header__link_active" : ""}`}
              >
                Сохранённые фильмы
              </NavLink>
            </nav>
            <ul className="header__menu">
              <li>
                <Link to="/profile">Аккаунт</Link>
              </li>
            </ul>
          </>
        ) : (
          <ul className="header__menu">
            <li>
              <Link to="/signup">Регистрация</Link>
            </li>
            <li>
              <Link to="/signin">Войти</Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
