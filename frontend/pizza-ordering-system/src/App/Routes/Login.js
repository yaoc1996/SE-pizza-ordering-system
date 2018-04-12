import React from 'react';
import { Link } from 'react-router-dom';

import {
  postLogin,
} from 'lib';

const Login = props => {
  const {
    redirectDest,
    redirect,
    setAppState,
  } = props;

  const onLogin = e => {
    e.preventDefault();
    
    const email = e.target.email.value;
    const password = e.target.password.value;

    postLogin({
      email,
      password,
    })
      .then(json => {
        if (json && json.success) {
          setAppState({
            user: json.user,
          })
          redirect();
        }
        console.log(json);
      })
  }

  return (
    <div className='fill' >
      <Link to='/home'>
        <button className='btn-md btn-blue margin-sm float-right' >
          Home
        </button>
      </Link>
      <Link to='/signup'>
        <button className='btn-md btn-blue margin-sm float-right' >
          Signup
        </button>
      </Link>
      <div className='centered-hv fade-in' >
        <label className='font-txl font-bold font-lightgrey' >Login</label>
        <br /><br />
        <label className='font-lg font-bold' >OPDS</label>
        <br /><br />
        <label className='font-xs font-bold font-lightgrey' >
          Online Pizza Delivery System
        </label>
        <br /><br /><br />
        <form className='form'
              onSubmit={onLogin} >
          <div className='form-field' >
            <label>Email:</label>
            <input  type='text'
                    name='email'
                    autoFocus
                    required />
          </div>
          <div className='form-field' >
            <label>Password:</label>
            <input  type='password'
                    name='password'
                    required />
          </div>
          <br /><br /><br />       
          <button className='btn-md btn-darkblue margin-sm'>Login</button>
        </form>
        <br /><br />
        {
          redirectDest === '/store' &&
          <label className='clickable font-sm font-blue'
            onClick={redirect} >Continue as guest</label>
        }
      </div>
    </div>
  )
}

export default Login;