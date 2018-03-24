import React, { Fragment } from 'react';

import {
  HVCenteredBox,
  PageHeading,
  LogoLabel,
  AppNameLabel,
  Form,
  FormField,
  FFLabel,
  FFInput,
  FormButton,
  FloatRButton,
} from 'styled';

import postSMLogin from 'lib/postSMLogin';

const Login = props => {
  const {
    history,
  } = props;

  const goTo = dest => () => {
    history.push(dest);
  }

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
      <FloatRButton
        onClick={goTo('/storemanager/signup')}>Signup to be a Store Manager</FloatRButton>
      <HVCenteredBox>
        <PageHeading
          style={{ color: '#F8BBD0' }} >Log In</PageHeading>
        <LogoLabel>Welcome Back</LogoLabel>
        <AppNameLabel>Online Pizza Delivery System</AppNameLabel>
        <Form
          onSubmit={onLogin} >
          <FormField>
            <FFLabel>Email:</FFLabel>
            <FFInput
              type='text'
              name='email'
              required />
          </FormField>
          <FormField>
            <FFLabel>Password:</FFLabel>
            <FFInput
              type='password'
              name='password'
              required />
          </FormField>
          <FormButton>Login</FormButton>
        </Form>
        </HVCenteredBox>
    </Fragment>
  )
}

export default Login;