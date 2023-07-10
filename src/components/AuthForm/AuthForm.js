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
  children,
}) {

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <main className='auth'>
      <Logo/>
      <h1 className='auth__title'>{title}</h1>
      <form className='auth__form' onSubmit={handleSubmit}>
        {children}
        <button type='submit' className='auth__submit-btn'>
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
