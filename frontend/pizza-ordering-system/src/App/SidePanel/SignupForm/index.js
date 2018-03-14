import React, { Fragment } from 'react';

import {
  SignupForm as Form,
  SignupLabel,
  FormField,
  FieldLabel,
  FieldInput,
  FieldSubmitButton,
  RedirectLabel,
} from './styled';

import postSignup from 'lib/postSignup';

const SignupForm = props => {
  const onRedirectToLogin = () => {
    props.setPanelState({
      visibleForm: 'login',
    })
  }

  const ifSignupSuccess = ({ message, token, user }) => {
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

  const onSignup = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    
    if (password === confirmPassword) {
      postSignup({
        username,
        firstname,
        lastname,
        email,
        password,
      })
        .then(json => {
          if (json.success) {
            ifSignupSuccess(json);
          } else {
            console.log(e);
          }
        })
    }
  }

  const formProps = {
    onSubmit: onSignup,
  }

  const usernameInputProps = {
    name: 'username',
    type: 'text',
    required: true,
  }

  const firstnameInputProps = {
    name: 'firstname',
    type: 'text',
    required: true,
  }

  const lastnameInputProps = {
    name: 'lastname',
    type: 'text',
    required: true,
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

  const confirmPasswordInputProps = {
    name: 'confirmPassword',
    type: 'password',
    required: true,
  }

  const submitButtonProps = {
    type: 'submit',
  }

  const redirectLabelProps = {
    onClick: onRedirectToLogin,
  }

  return (
    <Fragment>
      <Form { ...formProps } >
        <SignupLabel>Join Us!</SignupLabel>
        <FormField>
          <FieldLabel>Username</FieldLabel>
          <FieldInput { ...usernameInputProps } />
        </FormField>
        <FormField>
          <FieldLabel>First Name</FieldLabel>
          <FieldInput { ...firstnameInputProps } />
        </FormField>
        <FormField>
          <FieldLabel>Last Name</FieldLabel>
          <FieldInput { ...lastnameInputProps } />
        </FormField>
        <FormField>
          <FieldLabel>Email</FieldLabel>
          <FieldInput { ...emailInputProps } />
        </FormField>
        <FormField>
          <FieldLabel>Password</FieldLabel>
          <FieldInput { ...passwordInputProps } />
        </FormField>
        <FormField>
          <FieldLabel>Confirm Password</FieldLabel>
          <FieldInput { ...confirmPasswordInputProps } />
        </FormField>
        <FormField>
          <FieldSubmitButton { ...submitButtonProps } >&nbsp; Sign Up</FieldSubmitButton>
        </FormField>
      </Form>
      <RedirectLabel { ...redirectLabelProps } >Already signed up? Click here to Login!</RedirectLabel>
    </Fragment>
  )
}

export default SignupForm;