import React, {useState, useEffect, useCallback} from "react";
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
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import "./App.css";

function App() {
  const navigate = useNavigate();

  const [signedIn, setSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({name: '', email: ''});

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);


  // регистрация пользователя
  async function handleSignUp({name, email, password}) {
    setIsLoading(true);
    try {
      const userInfo = await mainApi.signup({name, email, password});
      if (userInfo) {
        navigate("/sign-in", {replace: true});
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  // вход пользователя
  async function handleSignIn({email, password}) {
    setIsLoading(true);
    try {
      const userInfo = mainApi.signin({email, password})
      if (userInfo) {
        setSignedIn(true);
        navigate("/movies", {replace: true});
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  // выход пользователя
  async function handleSignOut() {
    try {
      const userInfo = mainApi.signout()
      if (userInfo) {
        setSignedIn(false);
        setCurrentUser({});
        setSavedMovies([]);
        localStorage.clear();
        navigate("/", {replace: true});
      }
    } catch (error) {
      console.log(error);
    }
  }

  // обновление данных пользователя
  async function handleUpdateUser({name, email}) {
    setIsLoading(true);
    try {
      const userInfo = await mainApi.updateUser({name, email});
      if (userInfo) {
        setCurrentUser(userInfo)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const checkSignedIn = useCallback(async () => {
    try {
      const userInfo = await mainApi.getUser();
      if (userInfo) {
        setSignedIn(true);
        setCurrentUser(userInfo);
      }
    } catch (error) {
      console.log(error);
    }
  }, [])

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
    checkSignedIn();
  }, [signedIn, checkSignedIn]);

  useEffect(() => {
    if (signedIn) {
      getData();
    }
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
