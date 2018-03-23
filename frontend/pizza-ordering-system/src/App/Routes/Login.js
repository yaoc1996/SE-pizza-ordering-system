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
  FloatLButton,
  FloatRButton,
  ClickableLabel,
} from 'styled';

import postLogin from 'lib/postLogin';

const Login = props => {
  const {
    redirectDest,
    redirect,
    setAppState,
    history,
  } = props;

  const goTo = dest => () => {
    history.push(dest);
  }

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
      <FloatLButton
        onClick={goTo('/home')} >Home</FloatLButton>
      <FloatRButton
        onClick={goTo('/signup')} >Go To Sign Up</FloatRButton>
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