import React, { Component, Fragment } from 'react';

import {
  SignupForm as Form,
  SignupLabel,
  FormField,
  FieldLabel,
  FieldInput,
  FieldSubmitButton,
  RedirectLabel,
} from './styled';

class SignupForm extends Component {
  constructor() {
    super();

    this.onRedirectToLogin = this.onRedirectToLogin.bind(this);
  }

  onRedirectToLogin() {
    this.props.setPanelState({
      visibleForm: 'login',
    })
  }

  render() {
    const formProps = {
      onSubmit: this.props.onSignup,
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
      onClick: this.onRedirectToLogin,
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
}

export default SignupForm;