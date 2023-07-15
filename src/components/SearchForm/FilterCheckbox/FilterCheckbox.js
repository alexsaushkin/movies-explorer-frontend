import './FilterCheckbox.css';
import {useEffect, useState} from "react";

export default function FilterCheckbox({onFilterChange, isSaved}) {
  const [checked, setChecked] = useState(false);

  function handleFilterChange(e) {
    onFilterChange(e.target.checked);
    setChecked(e.target.checked);
  }

  useEffect(() => {
    if (!isSaved) {
      setChecked(JSON.parse(localStorage.getItem('checkBox')) || false);
    } else {
      setChecked(false);
    }
  }, [isSaved])

  return (
    <label className='filter'>
      <input
        className='filter__input'
        type='checkbox'
        onChange={handleFilterChange}
        checked={checked}
      />
      <span className='filter__path'></span>
      Короткометражки
    </label>
  )
}
