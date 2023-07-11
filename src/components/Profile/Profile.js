import React, {useContext, useEffect, useState} from "react";
import CurrentUserContext from '../../contexts/CurrentUserContext'
import './Profile.css';

export default function Profile({handleSignOut}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [isEdit, setIsEdit] = useState(false);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleIsEditClick() {
    setIsEdit(!isEdit);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // onUpdateUser({
    //   name,
    //   email,
    // })
    setIsEdit(!isEdit);
  }

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  return (
    <main className='profile'>
      <h1 className='profile__title'>
        Привет, {name}!
      </h1>
      <form className='profile__form' onSubmit={handleSubmit}>
        <div className='profile__input-container'>
          <label htmlFor='name-input' className='profile__label'>Имя</label>
          <input
            type='text'
            name='name'
            id='name-input'
            required
            className='profile__input'
            minLength="2"
            maxLength="30"
            value={name}
            onChange={handleNameChange}
            placeholder="Имя"
            disabled={!isEdit}
          />
        </div>
        <div className='profile__input-container'>
          <label htmlFor='email-input' className='profile__label'>E-mail</label>
          <input
            type='email'
            name='email'
            id='email-input'
            required
            className='profile__input'
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            disabled={!isEdit}
          />
        </div>
        <button type='submit' className={`profile__submit-btn ${isEdit ? '' : 'profile__submit-btn_hidden'}`}>
          Сохранить
        </button>
      </form>
      <button
        className={`profile__btn ${isEdit ? 'profile__btn_hidden' : ''}`}
        type='button'
        onClick={handleIsEditClick}
      >Редактировать</button>
      <button
        className={`profile__btn profile__btn_color_pink ${isEdit ? 'profile__btn_hidden' : ''}`}
        type='button'
        onClick={handleSignOut}
      >Выйти из аккаунта</button>
    </main>
  )
}
