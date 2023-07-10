import React, {useState} from "react";
import AuthForm from '../AuthForm/AuthForm';


export default function SignUp({handleSignUp}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <AuthForm
      title='Добро пожаловать!'
      onSubmit={handleSignUp}
      btnText='Зарегистрироваться'
      questionText='Уже зарегистрированы?'
      linkTo='/signin'
      linkText='Войти'
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
            minLength="2"
            maxLength="30"
            value={name}
            onChange={handleNameChange}
            placeholder="Имя"
          />
          <span className="auth__error name-input-error"></span>
        </div>
        <div className='auth__input-container'>
          <label htmlFor='email-input' className='auth__label'>E-mail</label>
          <input
            type='email'
            name='email'
            id='email-input'
            required
            className='auth__input'
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
          <span className="auth__error email-input-error"></span>
        </div>
        <div className='auth__input-container'>
          <label htmlFor='email-input' className='auth__label'>Пароль</label>
          <input
            type='password'
            name='password'
            id='password-input'
            required
            className='auth__input'
            value={password}
            onChange={handlePasswordChange}
            placeholder="Пароль"
          />
          <span className="auth__error password-input-error"></span>
        </div>
      </>
    </AuthForm>
  )
}
