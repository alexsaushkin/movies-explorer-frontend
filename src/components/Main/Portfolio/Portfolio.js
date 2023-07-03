import './Portfolio.css';

export default function Portfolio() {
  return (
    <div className='portfolio'>
      <h4 className='portfolio__title'>Портфолио</h4>
      <ul className='portfolio__projects'>
        <li className='portfolio__project'>
          <a
            href='https://github.com/alexsaushkin/how-to-learn'
            className='portfolio__project-link'
            target='_blank'
            rel='noreferrer'
          >
            Статичный сайт
            <span className='portfolio__arrow'>&rarr;</span>
          </a>
        </li>
        <li className='portfolio__project'>
          <a
            className='portfolio__project-link'
            href='https://alexsaushkin.github.io/russian-travel/'
            target='_blank'
            rel='noreferrer'
          >
            Адаптивный сайт
            <span className='portfolio__arrow'>&rarr;</span>
          </a>
        </li>
        <li className='portfolio__project'>
          <a
            className='portfolio__project-link'
            href='https://github.com/alexsaushkin/express-mesto-gha'
            target='_blank'
            rel='noreferrer'
          >
            Одностраничное приложение
            <span className='portfolio__arrow'>&rarr;</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
