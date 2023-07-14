import {useEffect, useState} from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';


export default function MoviesCardList({
                                         movies,
                                         savedMovies,
                                         notFound,
                                         error,
                                         isSaved,
                                         onSave,
                                         onDelete,
                                       }) {
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [visibleBtn, setVisibleBtn] = useState(false);

  // функция поиска в сохранённых
  function handleIsSavedMovie(savedMovies, movie) {
    return savedMovies.find((savedMovie) => {
      return savedMovie.movieId === (movie.id || movie.movieId);
    });
  }

  function handleClickMore() {
    const begin = visibleMovies.length;
    const end = begin + 3;
    if (movies.length > begin) {
      const moreMovies = movies.slice(begin, end);
      setVisibleMovies([...visibleMovies, ...moreMovies])
    }
  }

  useEffect(() => {
    if (isSaved) {
      setVisibleMovies(movies);
    } else {
      // обрезать количество в зависимости от разрешения
      const resMovies = movies.slice(0, 12);
      setVisibleMovies(resMovies);
    }
  }, [movies, isSaved]);

  useEffect(() => {
    if (visibleMovies.length < movies.length) {
      setVisibleBtn(true);
    } else {
      setVisibleBtn(false);
    }
  }, [movies, visibleBtn, visibleMovies])

  const movieObjects = visibleMovies.map((movie) => {
    return (
      <li key={movie.id || movie._id}>
        <MoviesCard
          movie={movie}
          isSaved={handleIsSavedMovie(savedMovies, movie)}
          image={!isSaved ? `https://api.nomoreparties.co${movie.image.url}` : `${movie.image}`}
          btnType={isSaved ? 'delete' : 'save'}
          onBtnClick={isSaved ? onDelete : onSave}
        />
      </li>
    );
  })

  return (
    <section className='movies-card-list'>
      {notFound ? (
        <p className='movies-card-list__message'>Ничего не найдено</p>
      ) : (
        <ul className='movies-card-list__items'>
          {movieObjects}
        </ul>
      )}
      <button className='movies-card-list__more' hidden={!visibleBtn} onClick={handleClickMore}>Ещё</button>
    </section>
  );
}
