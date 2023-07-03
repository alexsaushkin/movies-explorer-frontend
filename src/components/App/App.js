import React, {useRef, useState} from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Main from '../Main/Main'
import './App.css';

function App() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <div className='app'>
      <Header
        signedIn={signedIn}
      />
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
