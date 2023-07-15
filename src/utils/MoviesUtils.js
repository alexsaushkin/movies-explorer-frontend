  // функция фильтрации по времени
  export function handleFilterMovieDuration(movies) {
    // отбираем только фильмы у которых длительность меньше или равна 40 минутам
    return movies.filter((movie) => {
      return movie.duration <= 40;
    });
  }

  // функция фильтрации поиска
  export function handleFilterMovieNames(movies, search) {
    // убираем лишнее из поискового запроса
    const searchTrimmed = search.toLowerCase().trim();
    // фильтруем фильмы по запросу, проверяем содержится ли запрос в названии фильма
    return movies.filter((movie) => {
      return movie.nameRU.toLowerCase().trim().includes(searchTrimmed) ||
        movie.nameEN.toLowerCase().trim().includes(searchTrimmed);
    });
  }
