import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/logo-min.svg';
import './Logo.css';

export default function Logo({signedIn}) {
  return (
    <Link to='/'>
      <img className='logo' src={logo} alt='Лого'/>
    </Link>
  )
}
