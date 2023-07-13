import {useCallback, useState} from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import {handleFilterMovieNames, handleFilterMovieDuration} from '../../utils/MoviesUtils';

import './Movies.css';

export default function Movies({savedMovies, onSearch, onSave, onDelete, isLoading, error}) {
  // все фильмы
  const [allMovies, setAllMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [resultMovies, setResultMovies] = useState([]);
  // чекбокс миниатюр
  const [isCheckOn, setIsCheckOn] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearchMovies = useCallback(
    (movies, searchText) => {
      const foundMovies = handleFilterMovieNames(movies, searchText);
      setFoundMovies(foundMovies);
      if (!foundMovies.length) {
        setNotFound(true);
        setResultMovies(foundMovies);
      } else {
        if (isCheckOn) {
          const shortMovies = handleFilterMovieDuration(foundMovies);
          if (!shortMovies.length) {
            setNotFound(true);
          }
          setResultMovies(shortMovies);
        } else {
          setResultMovies(foundMovies);
        }
      }

    }, [isCheckOn]
  );

  const handleSubmit = useCallback(async (search) => {
      setNotFound(false);
      if (!allMovies.length) {
        const moviesData = await onSearch();
        if (moviesData) {
          setAllMovies(moviesData);
          handleSearchMovies(moviesData, search);
        }
      } else {
        handleSearchMovies(allMovies, search)
      }
    }, [allMovies, handleSearchMovies, onSearch]
  )

  const onFilterChange = useCallback(
    (isChecked) => {
      setIsCheckOn(isChecked);
      setNotFound(false);
      if (isChecked) {
        const movies = handleFilterMovieDuration(foundMovies);
        if (!movies.length) {
          setNotFound(true);
        }
        setResultMovies(movies);
      } else {
        if (!foundMovies.length) {
          setNotFound(true);
        }
        setResultMovies(foundMovies);
      }


    }, [foundMovies]
  )

  return (
    <main className='movies'>
      <SearchForm
        onSubmit={handleSubmit}
        onFilterChange={onFilterChange}
      />
      {isLoading && <Preloader/>}
      {!isLoading && <MoviesCardList
        movies={resultMovies}
        savedMovies={savedMovies}
        notFound={notFound}
        error={error}
        isSaved={false}
        onSave={onSave}
        onDelete={onDelete}
      />}

    </main>
  )
}
