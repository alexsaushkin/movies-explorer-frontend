import './MoviesCard.css'

export default function MoviesCard({movie, btnType, onBtnClick, isSaved}) {

  function getTime(minutes) {
    return `${Math.round(minutes / 60)}ч ${(minutes % 60)}м`
  }

  return (
    <a className='movie-card'
       href={movie.trailerLink}
       target='_blank'
       rel='noreferrer'
    >
      <div className='movie-card__info'>
        <div>
          <h3 className='movie-card__title'>{movie.nameRU}</h3>
          <p className='movie-card__time'>{getTime(movie.duration)}</p>
        </div>
        <button
          className={`movie-card__btn movie-card__btn_type_${btnType}`}
          type='button'
          onClick={onBtnClick}
        >
        </button>
      </div>
      <img
        className='movie-card__preview'
        src={`https://api.nomoreparties.co${movie.image.url}`}
        alt={movie.nameRU}
      />
    </a>
  );
}
