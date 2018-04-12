import React from 'react';
import { Link } from 'react-router-dom';

import { 
  postSMLogin,
} from 'lib';

const Login = props => {
  const {
  } = props;
  
  const onLogin = e => {
    e.preventDefault();
    
    const email = e.target.email.value;
    const password = e.target.password.value;

    postSMLogin({
      email,
      password,
    })
      .then(json => {
        if (json && json.success) {

        }
        console.log(json);
      })
  }

  return (
    <div className='fill' >
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
          <button className='btn-md btn-pink margin-sm'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login;