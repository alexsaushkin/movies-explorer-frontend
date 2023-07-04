import React, {useState} from 'react';
import {NavLink, Link} from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo-min.svg';

export default function Header({signedIn}) {

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  }

  return (
    <header className='header'>
      <Link to='/'>
        <img className='header__logo' src={logo} alt='Лого'/>
      </Link>
      {signedIn ? (
        <>
          <nav className='header__navigation'>
            <NavLink
              to='/movies'
              className={({isActive}) => `header__navigation-link ${isActive ? 'header__link_active' : ''}`}
            >Фильмы</NavLink>
            <NavLink
              to='/saved-movies'
              className={({isActive}) => `header__navigation-link ${isActive ? 'header__link_active' : ''}`}
            >Сохранённые фильмы</NavLink>
          </nav>
          <Link to='/profile' className='header__profile-link'>Аккаунт</Link>
          <div className='menu__burger'>
            <div className='menu__toggle-container' onClick={toggleMobileMenu}>
              <span className={`menu__toggle ${isMobileMenuOpened ? 'menu__toggle_clicked' : ''}`}></span>
            </div>
          </div>
        </>
      ) : (
        <ul className='header__menu'>
          <li>
            <Link to='/signup' className='header__signup-link'>Регистрация</Link>
          </li>
          <li>
            <Link to='/signin' className='header__signup-link header__signup-link_color_green'>Войти</Link>
          </li>
        </ul>
      )}
    </header>
  );
}
