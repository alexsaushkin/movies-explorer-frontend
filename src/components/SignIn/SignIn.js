import React, {useState} from "react";
import AuthForm from '../AuthForm/AuthForm';


export default function SignIp({handleSignIn}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <AuthForm
      title='Рады видеть!'
      onSubmit={handleSignIn}
      btnText='Войти'
      questionText='Ещё не зарегистрированы?'
      linkTo='/signup'
      linkText='Регистрация'
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
