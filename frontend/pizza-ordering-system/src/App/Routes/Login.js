import React, { Fragment } from 'react';

import {
  HVCenteredBox,
  PageHeading,
  Label,
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
        color='#455A64'
        background='#CFD8DC'
        hover='#90A4AE'
        active='white' 
        onClick={goTo('/home')} >Home</FloatLButton>
      <FloatRButton
        color='#455A64'
        background='#CFD8DC'
        hover='#90A4AE'
        active='white' 
        onClick={goTo('/signup')} >Go To Signup</FloatRButton>
      <HVCenteredBox>
        <PageHeading>Login</PageHeading>
        <Label>OPDS</Label>
        <br /><br />
        <Label
          fontSize='12px'
          color='#ddd' >Online Pizza Delivery System</Label>
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
          <FormButton
            color='white'
            background='#64B5F6'
            hover='#0277BD'
            active='#333' >Login</FormButton>
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