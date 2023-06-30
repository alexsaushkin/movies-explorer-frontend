import './NavTab.css';

export default function NavTab({onClickNav, menuItems}) {
  const menuElements = menuItems.map((menuData, i) => (
    <li key={menuData.id}>
      <button onClick={onClickNav(menuData.element)} className='nav-tab__menu-item'>{menuData.name}</button>
    </li>
  ));

  return (
    <section className='nav-tab'>
      <ul className='nav-tab__menu'>
        { menuElements }
      </ul>
    </section>
  )
}
