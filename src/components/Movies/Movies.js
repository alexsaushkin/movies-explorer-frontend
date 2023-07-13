import {useCallback, useEffect, useState} from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './Movies.css';

export default function Movies({savedMovies, onSearch, onSave, onDelete, isLoading}) {
  // все фильмы
  const [movies, setMovies] = useState([]);
  // чекбокс миниатюр
  const [isCheckOn, setIsCheckOn] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // функция фильтрации по времени
  function handleFilterMovieDuration(movies) {
    // отбираем только фильмы у которых длительность меньше или равна 40 минутам
    return movies.filter((movie) => {
      return movie.duration <= 40;
    });
  }

  // функция фильтрации поиска
  function handleFilterMovieNames(movies, search) {
    // убираем лишнее из поискового запроса
    const searchTrimmed = search.toLowerCase().trim();
    // фильтруем фильмы по запросу, проверяем содержится ли запрос в названии фильма
    return movies.filter((movie) => {
      return movie.nameRU.toLowerCase().trim().includes(searchTrimmed) ||
        movie.nameEN.toLowerCase().trim().includes(searchTrimmed);
    });
  }

  // функция поиска в сохранённых
  function handleIsSavedMovie(savedMovies, movie) {
    return savedMovies.find((savedMovie) => {
      return savedMovie.movieId === (movie.id || movie.movieId);
    });
  }

  function onFilterChange(val) {
    setIsCheckOn(val);
  }

  const handleSearchMovies = useCallback(
    (movies, searchText) => {
      const foundMovies = handleFilterMovieNames(movies, searchText);
      if (!foundMovies.length) {
        setNotFound(true);
      } else {
        if (isCheckOn) {
          setMovies(handleFilterMovieDuration(foundMovies))
        } else {
          setMovies(foundMovies)
        }
      }

    }, [isCheckOn]
  );

  const handleSubmit = useCallback(async (search) => {
      setNotFound(false);
      const moviesData = await onSearch();
      if (moviesData) {
        handleSearchMovies(moviesData, search);
      }
    }, [handleSearchMovies, onSearch]
  )

  return (
    <main className='movies'>
      <SearchForm
        onSubmit={handleSubmit}
        onFilterChange={onFilterChange}
      />
      <MoviesCardList
        movies={movies}
        savedMovies={savedMovies}
        notFound={notFound}
        isSaved={false}
        onSave={onSave}
        onDelete={onDelete}
        isLoading={isLoading}
      />
    </main>
  )
}
