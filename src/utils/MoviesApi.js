class MoviesApi{
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _request(url, method = 'GET') {
    const options = {
      method,
    };

    return fetch(`${this._baseUrl}/${url}`, options)
      .then(res => {
        const result = res.json();
        if (res.ok) {
          return result;
        }

        return result.then((error) => Promise.reject(`Ошибка: ${error.message}`));
      });
  }

  _get(url, method = 'GET') {
    return this._request(url, method)
  }

  getMovies() {
    return this._get('beatfilm-movies');
  }
}

const moviesApi = new MoviesApi(
  {
    baseUrl: 'https://api.nomoreparties.co',
  }
);

export default moviesApi;
