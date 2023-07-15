import React, {useContext, useEffect, useState} from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext'
import './Profile.css';
import useFormWithValidation from "../../utils/useFormWithValidation";
import {NAME_REGEX} from "../../utils/constants";

export default function Profile({onUpdate, onSignOut, isLoading, errorMessage, setErrorMessage}) {
  const currentUser = useContext(CurrentUserContext);
  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();
  const [oldEmail, setOldEmail] = useState('');
  const [oldName, setOldName] = useState('');
  const [isEqual, setIsEqual] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [message, setMessage] = useState('');

  function handleIsEditClick() {
    setOldEmail(values.email);
    setOldName(values.name);
    setIsEdit(!isEdit);
    setMessage('');
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdate(values)
      .then((data) => {
        if (data) {
          setIsEdit(!isEdit);
        }
        setMessage(data);
      })

  }

  useEffect(() => {
    resetForm(currentUser, {}, true)
  }, [resetForm, currentUser]);

  useEffect(() => {
    if (values.name !== oldName || values.email !== oldEmail) {
      setIsEqual(false);
    } else {
      setIsEqual(true);
    }
  }, [values, oldName, oldEmail])

  useEffect(() => {
    setErrorMessage('');
  }, [])

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
              value={values.name || ''}
              pattern={NAME_REGEX}
              onChange={handleChange}
              placeholder='Имя'
              disabled={!isEdit || isLoading}
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
              value={values.email || ''}
              onChange={handleChange}
              placeholder='Email'
              disabled={!isEdit || isLoading}
            />
            <span className='profile__error email-input-error'>{isValid ? '' : errors.email}</span>
          </div>

        </div>
        <p className='profile__error'>{message || errorMessage}</p>
        <button
          type='submit'
          disabled={!isValid || isEqual || isLoading}
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
