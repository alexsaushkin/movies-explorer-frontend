import React, {useContext, useEffect, useState} from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext'
import './Profile.css';
import useFormWithValidation from "../../utils/useFormWithValidation";
import {NAME_REGEX} from "../../utils/constants";

export default function Profile({onUpdate, onSignOut, isLoading}) {
  const currentUser = useContext(CurrentUserContext);
  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();
  const [isEdit, setIsEdit] = useState(false);

  function handleIsEditClick() {
    setIsEdit(!isEdit);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdate(values);
    setIsEdit(!isEdit);
  }

  useEffect(() => {
    resetForm(currentUser, {}, true)
  }, [resetForm, currentUser]);

  return (
    <main className='profile'>
      <h1 className='profile__title'>
        Привет, {currentUser.name || ''}!
      </h1>
      <form className='profile__form' onSubmit={handleSubmit}>
        <div className='profile__input-container'>
          <label htmlFor='name-input' className='profile__label'>Имя</label>
          <div className='profile__input-block'>
            <input
              type='text'
              name='name'
              id='name-input'
              required
              className='profile__input'
              minLength='2'
              maxLength='30'
              value={values.name || errors.name || ''}
              pattern={NAME_REGEX}
              onChange={handleChange}
              placeholder='Имя'
              disabled={!isEdit}
            />
            <span className='profile__error name-input-error'>{isValid ? '' : errors.name}</span>
          </div>
        </div>
        <div className='profile__input-container'>
          <label htmlFor='email-input' className='profile__label'>E-mail</label>
          <div className='profile__input-block'>
            <input
              type='email'
              name='email'
              id='email-input'
              required
              className='profile__input'
              value={values.email || errors.email || ''}
              onChange={handleChange}
              placeholder='Email'
              disabled={!isEdit}
            />
            <span className='profile__error email-input-error'>{isValid ? '' : errors.email}</span>
          </div>

        </div>
        <button
          type='submit'
          disabled={!isValid}
          className={`profile__submit-btn ${isEdit ? '' : 'profile__submit-btn_hidden'}`}
        >
          Сохранить
        </button>
      </form>
      <button
        className={`profile__btn ${isEdit ? 'profile__btn_hidden' : ''}`}
        type='button'
        onClick={handleIsEditClick}
      >Редактировать
      </button>
      <button
        className={`profile__btn profile__btn_color_pink ${isEdit ? 'profile__btn_hidden' : ''}`}
        type='button'
        onClick={onSignOut}
      >Выйти из аккаунта
      </button>
    </main>
  )
}
