import React from 'react';
import './Footer.css';
import {useLocation} from 'react-router-dom';

export default function Footer() {
  const {pathname} = useLocation();
  const isVisible = ['/movies', '/saved-movies', '/'].includes(pathname);

  return (
    <footer className={`footer ${isVisible ? '' : 'footer_hidden'}`}>
      <h4 className='footer__subtitle'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h4>
      <div className='footer__content'>
        <p className='footer__copyright'>&copy;&nbsp;{(new Date().getFullYear())}</p>
        <ul className='footer__links'>
          <li>
            <a
              className='footer__link'
              href='http://practicum.yandex.ru/'
              target='_blank'
              rel='noreferrer'
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              className='footer__link'
              href='https://github.com/alexsaushkin'
              target='_blank'
              rel='noreferrer'
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
