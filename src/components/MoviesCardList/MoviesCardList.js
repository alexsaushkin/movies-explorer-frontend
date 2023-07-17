import {useEffect, useState} from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import Resize from "../../utils/Resize";
import {
  DESKTOP_WIDTH,
  TABLET_WIDTH,
  DESKTOP_CARD_SLICE,
  DESKTOP_CARD_ROW,
  TABLET_CARD_SLICE,
  TABLET_CARD_ROW,
  MOBILE_CARD_SLICE,
  MOBILE_CARD_ROW
} from "../../utils/constants";
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
  const [cardSlice, setCardSlice] = useState(DESKTOP_CARD_SLICE);
  const [cardRow, setCardRow] = useState(DESKTOP_CARD_ROW);
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
    if (winSize >= DESKTOP_WIDTH) {
      setCardSlice(DESKTOP_CARD_SLICE);
      setCardRow(DESKTOP_CARD_ROW);
    } else if (winSize >= TABLET_WIDTH) {
      setCardSlice(TABLET_CARD_SLICE);
      setCardRow(TABLET_CARD_ROW);
    } else {
      setCardSlice(MOBILE_CARD_SLICE);
      setCardRow(MOBILE_CARD_ROW);
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
          onBtnClick={handleIsSavedMovie(savedMovies, movie) ? onDelete : onSave}
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
