import React from 'react';
import { Link } from 'react-router-dom';

const Login = props => {
  const {
    login,
  } = props;
  
  return (
    <div className='fill' >
      <Link to='/home'>
        <button className='btn-md btn-pink margin-sm float-right' >
          Home
        </button>
      </Link>
      <Link to='/management/signup'>
        <button className='btn-md btn-pink margin-sm float-right' >
          Signup
        </button>
      </Link>
      <div className='centered-hv fade-in' >
        <label className='font-txl font-bold font-lightgrey' >Login</label>
        <br /><br />
        <label className='font-lg font-bold' >Management Portal</label>
        <br /><br />
        <label className='font-xs font-bold font-lightgrey' >
          Online Pizza Delivery System
        </label>
        <br /><br /><br />
        <form className='form'
              onSubmit={login} >
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
          <button className='btn-md btn-pink margin-sm'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login;
