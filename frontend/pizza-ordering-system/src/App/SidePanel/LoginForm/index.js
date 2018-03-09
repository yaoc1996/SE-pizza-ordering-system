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

class LoginForm extends Component {
  constructor() {
    super();

    this.onRedirectToSignup = this.onRedirectToSignup.bind(this);
  }
  
  onRedirectToSignup() {
    this.props.setPanelState({
      visibleForm: 'signup',
    })
  }

  render() {
    const formProps = {
      onSubmit: this.props.onLogin,
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
      onClick: this.onRedirectToSignup,
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
}

export default LoginForm;