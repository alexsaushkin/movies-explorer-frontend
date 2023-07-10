import React, {useState, useEffect} from "react";
import {Routes, Route, useNavigate, Navigate} from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import NotFound from "../NotFound/NotFound";
import moviesApi from "../../utils/MoviesApi";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import "./App.css";

function App() {
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({name: 'Алексей', email: 'thirdyou@yandex.ru'});

  function handleSignUp() {
    navigate("/sign-in", {replace: true});
  }

  function handleSignIn() {
    setSignedIn(true);
    navigate("/movies", {replace: true});
  }

  function handleSignOut() {
    navigate("/", {replace: true});
    setSignedIn(false);
  }

  function onSave(card) {
    console.log(`${card} card saved`);
  }

  function onDelete(card) {
    console.log(`${card} card deleted`);
  }

  function getData() {
    moviesApi
      .getMovies()
      .then((moviesData) => {
        setMovies(moviesData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getData();
  }, [signedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div>
          <Header signedIn={signedIn}/>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route
              path="/movies"
              element={<Movies movies={movies.slice(0, 12)} onSave={onSave}/>}
            />
            <Route
              path="/saved-movies"
              element={
                <SavedMovies movies={movies.slice(0, 3)} onDelete={onDelete}/>
              }
            />
            <Route
              path="/profile"
              element={<Profile handleSignOut={handleSignOut}/>}
            />
            <Route
              path="/signin"
              element={<SignIn handleSignIn={handleSignIn}/>}
            />
            <Route
              path="/signup"
              element={<SignUp handleSignUp={handleSignUp}/>}
            />
            <Route path="/*" element={<NotFound/>}/>

            <Route
              path="/"
              element={signedIn ? <Navigate to="/"/> : <Navigate to="/signin"/>}
            />
          </Routes>
        </div>
        <Footer/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
