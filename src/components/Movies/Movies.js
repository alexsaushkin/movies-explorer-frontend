import {useCallback, useState} from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './Movies.css';

export default function Movies({savedMovies, onSearch, onSave, onDelete, isLoading}) {
  // все фильмы
  const [movies, setMovies] = useState([]);
  // чекбокс миниатюр
  const [isCheckOn, setIsCheckOn] = useState(false);

  function handleMovieSearch(movies, search, isSaved) {
    // убираем лишнее из поискового запроса
    const searchTrimmed = search.toLowerCase().trim();
    // фильтруем фильмы по запросу
    const moviesFiltered = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().trim().includes(searchTrimmed) ||
        movie.nameEN.toLowerCase().trim().includes(searchTrimmed);
    });
    return moviesFiltered;
  }

  return (
    <main className='movies'>
      <SearchForm/>
      <MoviesCardList
        movies={movies}
        savedMovies={savedMovies}
        isSaved={false}
        onSave={onSave}
        onDelete={onDelete}
        isLoading={isLoading}
      />
    </main>
  )
}
