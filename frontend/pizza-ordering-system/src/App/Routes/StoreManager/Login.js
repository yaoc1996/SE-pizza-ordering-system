import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import {
  HVCenteredBox,
  PageHeading,
  Label,
  FloatRButton,
} from 'styled';

import { 
  postSMLogin,
} from 'lib';

import {
  LoginForm,
} from 'components';

const Login = props => {
  const {
    history,
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
    <Fragment>
      <Link to='/storemanager/signup'>
        <FloatRButton
          color='white'
          background='#EC407A'
          hover='#F48FB1'
          active='#333' >Signup</FloatRButton>
      </Link>
      <HVCenteredBox>
        <PageHeading
          color='#EC407A' >Login</PageHeading>
        <Label>Management Portal</Label>
        <br /><br />
        <Label
          color='#ddd'
          fontSize='12px' >Online Pizza Delivery System</Label>
        <LoginForm
          onSubmit={onLogin}
          color='white'
          background='#EC407A'
          hover='#F48FB1'
          active='#333' />
      </HVCenteredBox>
    </Fragment>
  )
}

export default Login;