import NavTab from '../NavTab/NavTab';
import './Promo.css';

export default function Promo({onClickNav, menuItems}) {
  return (
    <section className='promo'>
      <h1 className='promo__title'>
        Учебный проект студента факультета Веб&#8209;разработки.
      </h1>
      <NavTab
        onClickNav={onClickNav}
        menuItems={menuItems}
      />
    </section>
  )
}
