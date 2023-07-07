import './Profile.css';

export default function Profile() {
  return (
    <main className='profile'>
      <h1 className='profile__title'>
        Привет, Алексей!
      </h1>
      <form className='profile__form'>
        <div className='profile__input-container'>
          <label htmlFor='name-input' className='profile__label'>Имя</label>
          <input
            type='text'
            name='name'
            id='name-input'
            required
            className='profile__input'
            minLength={2}
            maxLength={30}
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
          />
        </div>
        <button className='profile__btn' type='submit'>Редактировать</button>
      </form>
      <button className='profile__btn profile__btn_color_pink'>Выйти из аккаунта</button>
    </main>
  )
}
