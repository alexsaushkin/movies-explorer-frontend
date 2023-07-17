import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../Logo/Logo';
import './AuthForm.css';


export default function AuthForm({
  title,
  onSubmit,
  btnText,
  questionText,
  linkTo,
  linkText,
  isValid,
  isLoading,
  errorMessage,
  children,
}) {

  return (
    <main className='auth'>
      <Logo/>
      <h1 className='auth__title'>{title}</h1>
      <form
        className='auth__form'
        onSubmit={onSubmit}
      >
        {children}
        <p className='auth__error'>{errorMessage}</p>
        <button type='submit' className='auth__submit-btn' disabled={!isValid || isLoading}>
          {btnText}
        </button>
      </form>
      <p className='auth__question'>{questionText} <Link
        to={linkTo}
        className='auth__redirect-link'
      >{linkText}</Link></p>
    </main>
  )
}
