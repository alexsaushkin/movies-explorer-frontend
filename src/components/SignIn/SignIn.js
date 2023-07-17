import React, {useEffect} from 'react';
import AuthForm from '../AuthForm/AuthForm';
import useFormWithValidation from "../../utils/useFormWithValidation";
import {Navigate} from "react-router-dom";


export default function SignIp({handleSignIn, signedIn, isLoading, errorMessage, setErrorMessage}) {
  const {values, handleChange, errors, isValid} = useFormWithValidation();

  function onSignIn(e) {
    e.preventDefault();
    handleSignIn(values);
  }

  useEffect(() => {
    setErrorMessage('');
  }, [])

  return (
    <>
      {signedIn && <Navigate to='/movies' replace/>}
      {!signedIn && <AuthForm
        title='Рады видеть!'
        onSubmit={onSignIn}
        btnText='Войти'
        questionText='Ещё не зарегистрированы?'
        linkTo='/signup'
        linkText='Регистрация'
        isValid={isValid}
        isLoading={isLoading}
        errorMessage={errorMessage}
      >
        <>
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
