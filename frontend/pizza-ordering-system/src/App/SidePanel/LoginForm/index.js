import React, { Component } from 'react';

import {
  LoginForm as Form,
  LoginLabel,
  FormField,
  FieldLabel,
  FieldInput,
  FieldSubmitButton,
  RedirectLabel,
} from './styled';

import postLogin from 'lib/postLogin';

const LoginForm = props => {
  const onRedirectToSignup = () => {
    props.setPanelState({
      visibleForm: 'signup',
    })
  }

  const ifLoginSuccess = ({ message, token, user }) => {
    const {
      store,
      setAppState,
    } = props;

    window.localStorage.setItem('token', token);
    setAppState({
      user,
    })

    if (store) {
      //redirect to store
    }

    console.log(message);
  }

  const onLogin = e => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    
    if (email && password) {
      postLogin({
        email, 
        password,
      })
        .then(json => {
          if (json.success) {
            ifLoginSuccess(json);
          } else {
            console.log(json.message)
          }
        })
    }
  }

  const formProps = {
    onSubmit: onLogin,
  }

  const emailInputProps = {
    name: 'email',
    type: 'text',
    required: true,
  }

  const passwordInputProps = {
    name: 'password',
    type: 'password',
    required: true,
  }

  const submitButtonProps = {
    type: 'submit',
  }

  const redirectLabelProps = {
    onClick: onRedirectToSignup,
  }

  return (
    <Form { ...formProps } >
      <LoginLabel>Welcome!</LoginLabel>
      <FormField>
        <FieldLabel>Email</FieldLabel>
        <FieldInput { ...emailInputProps } />
      </FormField>
      <FormField>
        <FieldLabel>Password</FieldLabel>
        <FieldInput { ...passwordInputProps } />
      </FormField>
      <FieldSubmitButton { ...submitButtonProps } >&nbsp;Log In</FieldSubmitButton>
      <RedirectLabel { ...redirectLabelProps } >Need an account? Click here to Signup!</RedirectLabel>        
    </Form>
  )
}

export default LoginForm;