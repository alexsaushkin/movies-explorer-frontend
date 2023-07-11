import React, {useState} from 'react';
import {NavLink, Link, useLocation} from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Header.css';

export default function Header({signedIn}) {

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const {pathname} = useLocation();
  const isVisible = ['/movies', '/saved-movies', '/profile', '/'].includes(pathname);

  function toggleMobileMenu() {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  }

  return (
    <header className={`header ${isVisible ? '' : 'header_hidden'}`}>
      <Logo/>
      {signedIn ? (
        <>
          <div className='header__content'>
            <nav className='header__navigation'>
              <NavLink
                to='/movies'
                className={({isActive}) => `header__navigation-link ${isActive ? 'header__navigation-link_active' : ''}`}
              >Фильмы</NavLink>
              <NavLink
                to='/saved-movies'
                className={({isActive}) => `header__navigation-link ${isActive ? 'header__navigation-link_active' : ''}`}
              >Сохранённые фильмы</NavLink>
            </nav>
            <Link to='/profile' className='header__profile-link'>Аккаунт</Link>
          </div>
          <div className='menu__burger'>
            <div className='menu__toggle-container' onClick={toggleMobileMenu}>
              <span className={`menu__toggle ${isMobileMenuOpened ? 'menu__toggle_clicked' : ''}`}></span>
            </div>
            <div className={`menu__mobile ${isMobileMenuOpened ? 'menu__mobile_opened' : ''}`}>
              <div className='menu__content'>
                <nav className='menu__navigation'>
                  <NavLink
                    to='/'
                    className={({isActive}) => `menu__navigation-link ${isActive ? 'menu__navigation-link_active' : ''}`}
                  >Главная</NavLink>
                  <NavLink
                    to='/movies'
                    className={({isActive}) => `menu__navigation-link ${isActive ? 'menu__navigation-link_active' : ''}`}
                  >Фильмы</NavLink>
                  <NavLink
                    to='/saved-movies'
                    className={({isActive}) => `menu__navigation-link ${isActive ? 'menu__navigation-link_active' : ''}`}
                  >Сохранённые фильмы</NavLink>
                </nav>
                <Link to='/profile' className='menu__profile-link'>Аккаунт</Link>
              </div>
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
