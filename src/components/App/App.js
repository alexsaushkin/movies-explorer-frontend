import React, {useState, useEffect, useCallback} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './App.css';

function App() {
  const navigate = useNavigate();

  const [signedIn, setSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [savedMovies, setSavedMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  // регистрация пользователя
  async function handleSignUp({name, email, password}) {
    setIsLoading(true);
    try {
      const userInfo = await mainApi.signup({name, email, password});
      if (userInfo) {
        const userSignInInfo = await mainApi.signin({email, password})
        if (userSignInInfo) {
          setSignedIn(true);
          navigate('/movies', {replace: true});
        }
      }
    } catch (error) {
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  }

  // вход пользователя
  async function handleSignIn({email, password}) {
    setIsLoading(true);
    try {
      const userInfo = await mainApi.signin({email, password})
      if (userInfo) {
        setSignedIn(true);
        navigate('/movies', {replace: true});
      }
    } catch (error) {
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  }

  // выход пользователя
  async function handleSignOut() {
    try {
      const userInfo = await mainApi.signout()
      if (userInfo) {
        setSignedIn(false);
        setCurrentUser({});
        setSavedMovies([]);
        localStorage.clear();
        navigate('/', {replace: true});
      }
    } catch (error) {
      setErrorMessage(error);
    }
  }

  // обновление данных пользователя
  async function handleUpdateUser({name, email}) {
    setIsLoading(true);
    try {
      const userInfo = await mainApi.updateUser({name, email});
      if (userInfo) {
        setCurrentUser(userInfo);
        return 'Успешно!'
      }
    } catch (error) {
      setErrorMessage(error);
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
      setErrorMessage(error);
    }
  }, [])

  async function getMovies() {
    setIsLoading(true);
    try {
      const moviesData = await moviesApi.getMovies();
      if (moviesData) {
        return moviesData;
      }
    } catch (error) {
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  }

  const getSavedMovies = useCallback(async () => {
    try {
      const moviesData = await mainApi.getMovies();
      if (moviesData) {
        setSavedMovies(moviesData);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  }, [])

  async function onSave(movie) {
    try {
      const movieData = await mainApi.addMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
      if (movieData) {
        setSavedMovies([movieData, ...savedMovies]);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  }

  async function onDelete(movie) {
    const hasMovie = savedMovies.find((foundMovie) => foundMovie.movieId === movie.id || foundMovie.movieId === movie.movieId);
    try {
      const deletedMovie = await mainApi.deleteMovie(hasMovie._id);
      if (deletedMovie) {
        setSavedMovies((state) => state.filter((foundMovie) => (foundMovie._id !== hasMovie._id)))
      }
    } catch (error) {
      setErrorMessage(error);
    }
  }

  useEffect(() => {
    checkSignedIn();
  }, [signedIn, checkSignedIn]);

  useEffect(() => {
    if (signedIn) {
      getSavedMovies();
    }
  }, [signedIn, getSavedMovies]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <div>
          <Header signedIn={signedIn}/>
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route
              path='/movies'
              element={<ProtectedRoute
                element={Movies}
                savedMovies={savedMovies}
                onSearch={getMovies}
                onSave={onSave}
                onDelete={onDelete}
                isLoading={isLoading}
                error={errorMessage}
                signedIn={signedIn}
              />}
            />
            <Route
              path='/saved-movies'
              element={<ProtectedRoute
                element={SavedMovies}
                savedMovies={savedMovies}
                onDelete={onDelete}
                error={errorMessage}
                signedIn={signedIn}
              />}
            />
            <Route
              path='/profile'
              element={<ProtectedRoute
                element={Profile}
                onUpdate={handleUpdateUser}
                onSignOut={handleSignOut}
                isLoading={isLoading}
                signedIn={signedIn}
                errorMessage={errorMessage}
              />}
            />
            <Route
              path='/signin'
              element={<SignIn
                handleSignIn={handleSignIn}
                signedIn={signedIn}
                isLoading={isLoading}
              />}
            />
            <Route
              path='/signup'
              element={<SignUp
                handleSignUp={handleSignUp}
                signedIn={signedIn}
                isLoading={isLoading}
              />}
            />
            <Route path='/*' element={<NotFound/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
