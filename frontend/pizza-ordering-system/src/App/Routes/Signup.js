import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import {
  HVCenteredBox,
  PageHeading,
  Label,
  FloatRButton,
  FloatLButton,
} from 'styled';

import { 
  postSignup
} from 'lib';

import {
  SignupForm,
} from 'components';

const Signup = props => {
  const {
    history,
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
    <Fragment>
      <Link to='/home'>
        <FloatLButton
          color='white'
          background='#303F9F'
          hover='#5C6BC0'
          active='#333' >Home</FloatLButton>
      </Link>
      <Link to='/login'>
        <FloatRButton
          color='white'
          background='#303F9F'
          hover='#5C6BC0'
          active='#333' >Login</FloatRButton>
      </Link>
      <HVCenteredBox>
        <PageHeading
          color='#303F9F' >Signup</PageHeading>
        <Label>OPDS</Label>
        <br /><br />
        <Label
          color='#ddd'
          fontSize='12px' >Online Pizza Delivery System</Label>
        <SignupForm
          color='white'
          background='#303F9F'
          hover='#5C6BC0'
          active='#333'
          onSignup={onSignup} />
      </HVCenteredBox>
    </Fragment>
  )
}

export default Signup;