import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import {useEffect, useState} from "react";

export default function SearchForm({onSubmit, onFilterChange, isSaved}) {
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [searchText]);

  useEffect(() => {
    if (!isSaved) {
      setSearchText(localStorage.getItem('filterText') || '');
    } else {
      setSearchText('');
    }
  }, [isSaved])

  function handleTextChange(e) {
    setError('');
    setSearchText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (searchText) {
      setError('');
      onSubmit(searchText);
    } else {
      setError('Нужно ввести ключевое слово');
    }
  }

  return (
    <section className='search'>
      <form
        className='search__form'
        onSubmit={handleSubmit}
        noValidate
        action='#'
      >
        <div className='search__input-container'>
          <input
            type='text'
            name='search'
            placeholder='Фильм'
            required
            className='search__input'
            onChange={handleTextChange}
            value={searchText}
          />
          <button className='search__submit' type='submit'></button>
        </div>
        <FilterCheckbox
          onFilterChange={onFilterChange}
          isSaved={isSaved}
        />
      </form>
      <span className='search__error'>{error}</span>
    </section>
  );
}
