import React, {useRef, useState} from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Main from '../Main/Main'
import './App.css';

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const aboutProjectRef = useRef(null);
  const aboutMeRef = useRef(null);
  const techsRef = useRef(null);
  const menuItems = [
    {id: 'about-project', element: aboutProjectRef, name: 'О проекте'},
    {id: 'techs', element: techsRef, name: 'Технологии'},
    {id: 'about-me', element: aboutMeRef, name: 'Студент'},
  ];

  const handleClickNav = ({element}) => {
    element.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  return (
    <div className='app'>
      <Header
        signedIn={signedIn}
      />
      <Main
        handleClickNav={handleClickNav}
        menuItems={menuItems}
        aboutProjectRef={aboutProjectRef}
        techsRef={techsRef}
        aboutMeRef={aboutMeRef}
      />
      <Footer/>
    </div>
  );
}

export default App;
