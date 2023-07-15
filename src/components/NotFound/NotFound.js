import React from 'react';
import {useNavigate} from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();
  const doesAnyHistoryEntryExist = window.history.state && window.history.state.idx > 0;

	function goBack() {
    if (doesAnyHistoryEntryExist) {
      navigate(-1);
    } else {
      navigate('/', {replace: true});
    }
	}

  return (
    <main className='not-found'>
      <h1 className='not-found__title'>404</h1>
      <p className='not-found__text'>Страница не найдена</p>
      <button onClick={goBack} type="button" className='not-found__link'>Назад</button>
    </main>
  )
}
