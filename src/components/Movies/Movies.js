import {useState} from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './Movies.css';

export default function Movies({ savedMovies, onSearch, onSave, onDelete, isLoading }) {
  const [ allMovies, setAllMovies ] = useState([]);
  const [isCheckOn, setIsCheckOn] = useState(false);

  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList
        movies={allMovies}
        savedMovies={savedMovies}
        isSaved={false}
        onSave={onSave}
        onDelete={onDelete}
        isLoading={isLoading}
      />
    </main>
  )
}
