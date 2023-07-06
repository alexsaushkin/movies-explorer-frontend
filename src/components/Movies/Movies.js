import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './Movies.css';

export default function Movies({ movies, onSave }) {
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList
        movies={movies}
        isSaved={false}
        onBtnClick={onSave}
      />
    </main>
  )
}
