import React from 'react';

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
} from 'styled';

import postLogin from 'lib/postLogin';

const Login = props => {
  const {
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
    <HVCenteredBox>
      <PageHeading>Log In</PageHeading>
      <LogoLabel>OPDS</LogoLabel>
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
  )
}

export default Login;