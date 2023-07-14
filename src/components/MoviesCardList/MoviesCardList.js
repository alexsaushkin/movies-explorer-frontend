import {useEffect, useState} from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import Resize from "../../utils/Resize";
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
  const [cardSlice, setCardSlice] = useState(12);
  const [cardRow, setCardRow] = useState(3);
  const winSize = Resize();

  // функция поиска в сохранённых
  function handleIsSavedMovie(savedMovies, movie) {
    return savedMovies.find((savedMovie) => {
      return savedMovie.movieId === (movie.id || movie.movieId);
    });
  }

  function handleClickMore() {
    const begin = visibleMovies.length;
    const end = begin + cardRow;
    if (movies.length > begin) {
      const moreMovies = movies.slice(begin, end);
      setVisibleMovies([...visibleMovies, ...moreMovies])
    }
  }

  useEffect(() => {
    if (isSaved) {
      setVisibleMovies(movies);
    } else {
      if (localStorage.getItem('movies')) {
        const resMovies = JSON.parse(localStorage.getItem('movies')).slice(0, cardSlice);
        setVisibleMovies(resMovies);
      } else {
        const resMovies = movies.slice(0, cardSlice);
        setVisibleMovies(resMovies);
      }
    }
  }, [cardSlice, movies, isSaved]);

  useEffect(() => {
    if (visibleMovies.length < movies.length) {
      setVisibleBtn(true);
    } else {
      setVisibleBtn(false);
    }
  }, [movies, visibleBtn, visibleMovies])

  useEffect(() => {
    if (winSize >= 984) {
      setCardSlice(12);
      setCardRow(3);
    } else if (winSize >= 700) {
      setCardSlice(8);
      setCardRow(2);
    } else {
      setCardSlice(5);
      setCardRow(1);
    }
  }, [winSize]);

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
