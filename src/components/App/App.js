import React from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './App.css';

function App() {
  return (
    <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Footer/>
    </CurrentUserContext.Provider>
  );
}

export default App;
