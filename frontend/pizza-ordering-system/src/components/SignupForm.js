import React from 'react';

import {
  Form,
  FormField,
  FFLabel,
  FFInput,
  FormButton,
} from 'styled';

const SignupForm = ({ onSignup, color, background, hover, active, Injection }) =>
  <Form
    onSubmit={onSignup} >
    <FormField>
      <FFLabel>Firstname:</FFLabel>
      <FFInput
        type='text'
        name='firstname'
        autoFocus
        required />
    </FormField>
    <FormField>
      <FFLabel>Lastname:</FFLabel>
      <FFInput
        type='text'
        name='lastname'
        required />
    </FormField>
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
    <FormField>
      <Injection />
    </FormField>
    <FormButton
      color={color}
      background={background}
      hover={hover}
      active={active}  >Sign Up</FormButton>
  </Form>

  SignupForm.defaultProps = {
    Injection: props => null,
  }

  export default SignupForm;