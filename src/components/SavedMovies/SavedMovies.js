import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies({ movies, onDelete }) {
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
