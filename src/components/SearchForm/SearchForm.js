import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm() {
  return (
    <section className='search'>
      <form className='search__form'>
        <div className='search__input-container'>
          <input
            type='text'
            name='search'
            placeholder='Фильм'
            required
            className='search__input'
          />
          <button className='search__submit' type='submit'></button>
        </div>
        <FilterCheckbox/>
      </form>
    </section>
  );
}
