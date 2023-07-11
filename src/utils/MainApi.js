class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._methodsWithBody = ['PATCH', 'POST', 'PUT'];
  }

  _request(url, method = 'GET', params = {}) {
    const options = {
      method,
      headers: this._headers,
      credentials: 'include',
    };

    if (this._methodsWithBody.includes(method)) {
      if (params !== undefined) {
        options['body'] = JSON.stringify(params);
      }
    }

    return fetch(`${this._baseUrl}/${url}`, options)
      .then(res => {
        const result = res.json();
        if (res.ok) {
          return result;
        }

        return result.then((error) => Promise.reject(`Ошибка: ${error.message}`));
      });
  }

  _get(url, method = 'GET', params = {},) {
    return this._request(url, method, params)
  }

  getUser() {
    return this._get('users/me');
  }

  updateUser({name, email}) {
    return this._get('users/me', 'PATCH', {
      name,
      email
    });
  }

  getMovies() {
    return this._get('movies');
  }

  addMovie({
             country,
             director,
             duration,
             year,
             description,
             image,
             trailerLink,
             thumbnail,
             owner,
             movieId,
             nameRU,
             nameEN,
           }) {
    return this._get('movies', 'POST', {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    });
  }

  deleteMovie(id) {
    return this._get(`movies/${id}`, 'DELETE');
  }

  signup({name, email, password}) {
    return this._get('signup', 'POST', {
      name,
      email,
      password,
    });
  }

  signin({email, password}) {
    return this._get('signin', 'POST', {
      email,
      password,
    });
  }

  signout() {
    return this._get('signout', 'POST');
  }

}

const mainApi = new MainApi(
  {
    baseUrl: 'https://api.movies-thirdyou.nomoredomains.rocks',
    headers: {
      'Content-Type': 'application/json'
    }
  }
);

export default mainApi;
