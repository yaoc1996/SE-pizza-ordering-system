import React from 'react';

import {
  Form,
  FormField,
  FFLabel,
  FFInput,
  FormButton,
} from 'styled';

const LoginForm = ({ onLogin, color, background, hover, active }) =>
  <Form
  onSubmit={onLogin} >
    <FormField>
      <FFLabel>Email:</FFLabel>
      <FFInput
        type='text'
        name='email'
        autoFocus
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
      color={color}
      background={background}
      hover={hover}
      active={active} >Log In</FormButton>
  </Form>

export default LoginForm;