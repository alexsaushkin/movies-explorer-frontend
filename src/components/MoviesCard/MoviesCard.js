import './MoviesCard.css'

export default function MoviesCard({movie, isSaved, image, btnType, onBtnClick}) {

  function getTime(minutes) {
    return `${Math.round(minutes / 60)}ч ${(minutes % 60)}м`
  }

  function handleBtnClick() {
    onBtnClick(movie);
  }

  return (
    <div className='movie-card'>
      <div className='movie-card__info'>
        <a
          className='movie-card__link'
          href={movie.trailerLink}
          target='_blank'
          rel='noreferrer'>
          <h3 className='movie-card__title'>{movie.nameRU}</h3>
          <p className='movie-card__time'>{getTime(movie.duration)}</p>
        </a>
        <button
          className={`movie-card__btn movie-card__btn_type_${btnType}
          ${isSaved && btnType === 'save' ? 'movie-card__btn_active' : ''}`}
          type='button'
          onClick={handleBtnClick}
        >
        </button>
      </div>
      <a
        className='movie-card__link'
        href={movie.trailerLink}
        target='_blank'
        rel='noreferrer'
      >
        <img
          className='movie-card__preview'
          src={image}
          alt={movie.nameRU}
        />
      </a>

    </div>
  );
}
