import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({movies, isSaved, onBtnClick}) {
  const movieObjects = movies.map((movie) => {
    return (
      <li key={movie.id}>
        <MoviesCard
          movie={movie}
          btnType={isSaved ? 'delete': 'save'}
          onBtnClick={onBtnClick}
        />
      </li>
    );
  })

  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__items'>
        {movieObjects}
      </ul>
      <button className='movies-card-list__more'>Ещё</button>
    </section>
  );
}
