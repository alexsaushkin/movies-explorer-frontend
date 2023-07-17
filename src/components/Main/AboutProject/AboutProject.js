import BlockTitle from '../BlockTitle/BlockTitle';
import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className='about-project' id='about-project'>
      <BlockTitle title='О проекте'/>
      <ul className='about-project__block'>
        <li className='about-project__block-item'>
          <h3 className='about-project__subtitle'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__description'>
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
        </li>
        <li className='about-project__block-item'>
          <h3 className='about-project__subtitle'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__description'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className='about-project__timeline'>
        <li className='about-project__timeline-item'>
          <h4 className='about-project__timeline-time about-project__timeline-time_color_green'>
            1 неделя
          </h4>
          <p className='about-project__timeline-text'>
            Back-end
          </p>
        </li>
        <li className='about-project__timeline-item about-project__timeline-item_wide'>
          <h4 className='about-project__timeline-time'>
            4 неделя
          </h4>
          <p className='about-project__timeline-text'>
            Front-end
          </p>
        </li>
      </ul>
    </section>
  );
}
