import React, {useEffect} from 'react';
import AuthForm from '../AuthForm/AuthForm';
import useFormWithValidation from "../../utils/useFormWithValidation";
import {NAME_REGEX} from "../../utils/constants";
import {Navigate} from "react-router-dom";


export default function SignUp({handleSignUp, signedIn, isLoading, errorMessage, setErrorMessage}) {
  const {values, handleChange, errors, isValid} = useFormWithValidation();

  function onSignUp(e) {
    e.preventDefault();
    handleSignUp(values);
  }

  useEffect(() => {
    setErrorMessage('');
  }, [])

  return (
    <>
      {signedIn && <Navigate to='/movies' replace/>}
      {!signedIn && <AuthForm
        title='Добро пожаловать!'
        onSubmit={onSignUp}
        btnText='Зарегистрироваться'
        questionText='Уже зарегистрированы?'
        linkTo='/signin'
        linkText='Войти'
        isValid={isValid}
        isLoading={isLoading}
        errorMessage={errorMessage}
      >
        <>
          <div className='auth__input-container'>
            <label htmlFor='name-input' className='auth__label'>Имя</label>
            <input
              type='text'
              name='name'
              id='name-input'
              required
              className='auth__input'
              minLength='2'
              maxLength='30'
              value={values.name || ''}
              pattern={NAME_REGEX}
              onChange={handleChange}
              placeholder='Имя'
              disabled={isLoading ? true : false}
            />
            <span className='auth__error name-input-error'>{errors.name}</span>
          </div>
          <div className='auth__input-container'>
            <label htmlFor='email-input' className='auth__label'>E-mail</label>
            <input
              type='email'
              name='email'
              id='email-input'
              required
              className='auth__input'
              value={values.email || ''}
              onChange={handleChange}
              placeholder='Email'
              disabled={isLoading ? true : false}
            />
            <span className='auth__error email-input-error'>{errors.email}</span>
          </div>
          <div className='auth__input-container'>
            <label htmlFor='email-input' className='auth__label'>Пароль</label>
            <input
              type='password'
              name='password'
              id='password-input'
              required
              className='auth__input'
              value={values.password || ''}
              onChange={handleChange}
              placeholder='Пароль'
              disabled={isLoading ? true : false}
            />
            <span className='auth__error password-input-error'>{errors.password}</span>
          </div>
        </>
      </AuthForm>}
    </>

  )
}
