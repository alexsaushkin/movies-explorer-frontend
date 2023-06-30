import React, {useState} from 'react';
import {NavLink, Link} from 'react-router-dom';

export default function Header({signedIn}) {

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  }

  return (
    <header className='header'>
      <div className='header__content'>
        <div className='header__logo'></div>
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
              <Link to='/signin' className='header__signin-link'>Войти</Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
