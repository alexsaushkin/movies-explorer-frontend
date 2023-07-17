import {useCallback, useEffect, useState} from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {handleFilterMovieNames, handleFilterMovieDuration} from '../../utils/MoviesUtils';


export default function SavedMovies({savedMovies, onDelete, error}) {
  const [foundMovies, setFoundMovies] = useState([]);
  const [resultMovies, setResultMovies] = useState([]);
  // чекбокс миниатюр
  const [searchText, setSearchText] = useState('');
  const [isCheckOn, setIsCheckOn] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearchMovies = useCallback(
    (movies, searchText) => {
      const foundMovies = handleFilterMovieNames(movies, searchText);
      setSearchText(searchText);
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
      handleSearchMovies(savedMovies, search);
    }, [handleSearchMovies, savedMovies]
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

  useEffect(() => {
    const foundMovies = handleFilterMovieNames(savedMovies, searchText);
    setFoundMovies(foundMovies);
    if (isCheckOn) {
      const res = handleFilterMovieDuration(foundMovies);
      setResultMovies(res);
      if (!res) {
        setNotFound(true);
      }
    } else {
      setResultMovies(foundMovies);
      if (!foundMovies) {
        setNotFound(true);
      }
    }
  }, [savedMovies, isCheckOn, searchText])

  return (
    <main className='movies'>
      <SearchForm
        onSubmit={handleSubmit}
        onFilterChange={onFilterChange}
        isSaved={true}
      />
      <MoviesCardList
        movies={resultMovies}
        savedMovies={savedMovies}
        notFound={notFound}
        error={error}
        isSaved={true}
        onDelete={onDelete}
      />
    </main>
  )
}
