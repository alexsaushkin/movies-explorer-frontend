import React, {useState} from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import NotFound from '../NotFound/NotFound';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(false);

  function handleSignUp() {
    navigate('/sign-in', { replace: true });
  }

  function handleSignIn() {
    setSignedIn(true);
    navigate('/movies', { replace: true });

  }

  function handleSignOut() {
    navigate('/', { replace: true });
    setSignedIn (false);
  }

  return (
    <div className='app'>
      <Header
        signedIn={signedIn}
      />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile handleSignOut={handleSignOut} />} />
        <Route path="/signin" element={<SignIn handleSignIn={handleSignIn} />} />
        <Route path="/signup" element={<SignUp handleSignUp={handleSignUp} />} />
        <Route path="/*" element={<NotFound />} />

        <Route path="/"
          element = {signedIn ? <Navigate to="/" /> : <Navigate to="/signin" />}
        />

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
