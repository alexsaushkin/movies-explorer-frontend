import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({ movies, onDelete }) {
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList
        movies={movies}
        isSaved={true}
        onBtnClick={onDelete}
      />
    </main>
  )
}
