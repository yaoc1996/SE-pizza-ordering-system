import React from 'react';
import { Link } from 'react-router-dom';

import { 
  postSignup
} from 'lib';

const Signup = props => {
  const {
    redirect,
    setAppState,
  } = props;

  const onSignup = e => {
    e.preventDefault();
    
    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    postSignup({
      firstname,
      lastname,
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
      <Link to='/login'>
        <button className='btn-md btn-blue margin-sm float-right' >
          Login
        </button>
      </Link>
      <div className='centered-hv fade-in' >
        <label className='font-txl font-bold font-lightgrey' >Signup</label>
        <br /><br />
        <label className='font-lg font-bold' >OPDS</label>
        <br /><br />
        <label className='font-xs font-bold font-lightgrey' >
          Online Pizza Delivery System
        </label>
        <br /><br /><br />
        <form className='form'
              onSubmit={onSignup} >
          <div className='form-field' >
            <label>Firstname:</label>
            <input  type='text'
                    name='firstname'
                    autoFocus
                    required />
          </div>
          <div className='form-field' >
            <label>Lastname:</label>
            <input  type='text'
                    name='lastname'
                    required />
          </div>
          <div className='form-field' >
            <label>Email:</label>
            <input  type='text'
                    name='email'
                    required />
          </div>
          <div className='form-field' >
            <label>Password:</label>
            <input  type='password'
                    name='password'
                    required />
          </div>
          <br /><br /><br />  
          <button className='btn-md btn-darkblue margin-sm'>Signup</button>
        </form>
      </div>
    </div>
  )
}

export default Signup;