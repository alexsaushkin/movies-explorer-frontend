import myPhoto from '../../../images/my-photo.jpg';
import BlockTitle from '../BlockTitle/BlockTitle';
import Portfolio from '../Portfolio/Portfolio';

export default function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <div className="about-me__content">
        <BlockTitle text="Студент" />
        <article className="about-me__block">
          <div className="about-me__information">
            <h3 className="about-me__title">Алексей</h3>
            <p className="about-me__description">Вечный студент, 25 лет</p>
            <p className="about-me__text">
              Я живу в Санкт-Петербурге, закончил бакалавриат в СПбГУ,
              магистратуру в НИУ ВШЭ по направлению юриспруденция.
              С 2022 года начал учиться фронтенд-разработке.
            </p>
            <a
              className="about-me__link"
              href="https://github.com/alexsaushkin"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
          <img
            className="about-me__photo"
            src={myPhoto}
            alt="Фото автора"
          />
        </article>
        <Portfolio />
      </div>
    </section>
  );
}
