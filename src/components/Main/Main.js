import { useEffect, useRef, useState } from "react";
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import './Main.css';


export default function Main({handleClickNav, menuItems, aboutProjectRef, techsRef, aboutMeRef}) {
  return (
    <main className='main'>
      <Promo
        onClickNav={handleClickNav}
        menuItems={menuItems}
      />
      <AboutProject
        refObject={aboutProjectRef}
      />
      <Techs
        refObject={techsRef}
      />
      <AboutMe
        refObject={aboutMeRef}
      />
      <Portfolio/>
    </main>
  )
}
