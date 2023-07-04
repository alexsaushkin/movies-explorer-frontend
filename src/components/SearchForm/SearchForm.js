import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm() {
  return (
    <section className='search'>
      <form className='search__form'>
        <input
          id='search-input'
          type='text'
          name='search'
          placeholder='Фильм'
          required
          className='search__input'
        />
        <button className='search__submit' type='submit'></button>
      </form>
      <FilterCheckbox/>
    </section>
  );
}
