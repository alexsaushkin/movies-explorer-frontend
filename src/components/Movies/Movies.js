import {useCallback, useEffect, useState} from "react";
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
  const [filterText, setFilterText] = useState('');
  const [notFound, setNotFound] = useState(false);

  const handleSearchMovies = useCallback(
    (movies, searchText) => {
      const foundMovies = handleFilterMovieNames(movies, searchText);
      setFoundMovies(foundMovies);

      if (!foundMovies.length) {
        setNotFound(true);
        setResultMovies(foundMovies);
        localStorage.setItem('movies', JSON.stringify(foundMovies));
      } else {
        if (isCheckOn) {
          const shortMovies = handleFilterMovieDuration(foundMovies);
          if (!shortMovies.length) {
            setNotFound(true);
          }
          setResultMovies(shortMovies);
          localStorage.setItem('movies', JSON.stringify(shortMovies));
        } else {
          setResultMovies(foundMovies);
          localStorage.setItem('movies', JSON.stringify(foundMovies));
        }
      }

    }, [isCheckOn]
  );

  const handleSubmit = useCallback(async (search) => {
      localStorage.setItem('filterText', search);
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
      localStorage.setItem('checkBox', isChecked);
      if (isChecked) {
        const movies = handleFilterMovieDuration(foundMovies);
        if (!movies.length) {
          setNotFound(true);
        }
        setResultMovies(movies);
        localStorage.setItem('movies', JSON.stringify(movies));
      } else {
        if (!foundMovies.length) {
          setNotFound(true);
        }
        localStorage.setItem('movies', JSON.stringify(foundMovies));
        setResultMovies(foundMovies);
      }


    }, [foundMovies]
  )

  useEffect(() => {
    if (localStorage.getItem('filterText') && localStorage.getItem('checkBox')) {
      setIsCheckOn(JSON.parse(localStorage.getItem('checkBox')));
      if (localStorage.getItem('movies')) {
        setResultMovies(JSON.parse(localStorage.getItem('movies')));
      }
      const text = localStorage.getItem('filterText');
      setFilterText(text);
      if (localStorage.getItem('allMovies')) {
        const allMovies = JSON.parse(localStorage.getItem('allMovies'));
        setAllMovies(allMovies);
        setFoundMovies(handleFilterMovieNames(allMovies, text))
      }
    }
  }, [])

  return (
    <main className='movies'>
      <SearchForm
        onSubmit={handleSubmit}
        onFilterChange={onFilterChange}
        isSaved={false}
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
