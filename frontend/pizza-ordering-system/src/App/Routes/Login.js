import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import {
  HVCenteredBox,
  PageHeading,
  Label,
  FloatLButton,
  FloatRButton,
  ClickableLabel,
} from 'styled';

import {
  LoginForm,
} from 'components';

import {
  postLogin,
} from 'lib';

const Login = props => {
  const {
    redirectDest,
    redirect,
    setAppState,
    history,
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
    <Fragment>
      <Link to='/home'>
        <FloatLButton
          color='white'
          background='#303F9F'
          hover='#5C6BC0'
          active='#333' >Home</FloatLButton>
      </Link>
      <Link to='/signup'>
        <FloatRButton
          color='white'
          background='#303F9F'
          hover='#5C6BC0'
          active='#333' >Signup</FloatRButton>
      </Link>
      <HVCenteredBox>
        <PageHeading
          color='#303F9F' >Login</PageHeading>
        <Label>OPDS</Label>
        <br /><br />
        <Label
          fontSize='12px'
          color='#ddd' >Online Pizza Delivery System</Label>
        <LoginForm
          color='white'
          background='#303F9F'
          hover='#5C6BC0'
          active='#333'
          onLogin={onLogin} />
        {
          redirectDest === '/store' &&
          <ClickableLabel
            onClick={redirect} >Continue without logging in...</ClickableLabel>
        }
        </HVCenteredBox>
    </Fragment>
  )
}

export default Login;