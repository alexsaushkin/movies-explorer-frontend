import "./NavTab.css";

export default function NavTab() {
  return (
    <section className="nav-tab">
      <ul className="nav-tab__menu">
          <li key='about-project'>
            <a href="#about-project"
              className="nav-tab__menu-item"
            >
              О прокте
            </a>
          </li>
          <li key='techs'>
            <a href="#techs"
              className="nav-tab__menu-item"
            >
              Технологии
            </a>
          </li>
          <li key='about-me'>
            <a href="#about-me"
              className="nav-tab__menu-item"
            >
              Студент
            </a>
          </li>
      </ul>
    </section>
  );
}
