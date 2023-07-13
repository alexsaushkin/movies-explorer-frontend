import './FilterCheckbox.css';

export default function FilterCheckbox({onFilterChange}) {
  function handleFilterChange(e) {
    onFilterChange(e.target.checked);
  }

  return (
    <label className='filter'>
      <input
        className='filter__input'
        type='checkbox'
        onChange={handleFilterChange}
      />
      <span className='filter__path'></span>
      Короткометражки
    </label>
  )
}
