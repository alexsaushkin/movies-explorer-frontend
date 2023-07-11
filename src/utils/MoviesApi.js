class MoviesApi{
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _request(url, method = 'GET', params = {}) {
    const options = {
      method,
    };

    return fetch(`${this._baseUrl}/${url}`, options)
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  _get(url, method = 'GET', params = {}, ) {
    return this._request(url, method, params)
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
