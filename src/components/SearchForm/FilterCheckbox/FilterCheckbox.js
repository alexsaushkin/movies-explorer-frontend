import './FilterCheckbox.css';

export default function FilterCheckbox() {
  return (
    <label className="filter">
      Короткометражки
      <input className="filter__input" type="checkbox"/>
      <span className="filter__path"></span>
    </label>
  )
}
