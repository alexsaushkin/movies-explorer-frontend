import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <h4 className='footer__subtitle'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h4>
      <div className='footer__content'>
        <p className='footer__copyright'>&copy;&nbsp;{(new Date().getFullYear())}</p>
        <ul className='footer_links'>
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
