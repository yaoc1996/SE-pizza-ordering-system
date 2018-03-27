import React from 'react';

import {
  Form,
  FormField,
  FFLabel,
  FFInput,
  FFTextarea,
  FormButton,
} from 'styled';

const SetupForm = ({ onSetup, color, background, hover, active }) =>
  <Form
    onSubmit={onSetup} >
    <FormField>
      <FFLabel>Store Name:</FFLabel>
      <FFInput
        type='text'
        name='name'
        autoFocus
        required />
    </FormField>
    <FormField>
      <FFLabel>Address:</FFLabel>
      <FFInput
        type='text'
        name='address'
        required />
    </FormField>
    <FormField>
      <FFLabel style={{ verticalAlign: 'top' }} >Description:</FFLabel>
      <FFTextarea
        type='text'
        name='description' />
    </FormField>
    <FormButton
      color={color}
      background={background}
      hover={hover}
      active={active} >Sign Up</FormButton>
  </Form>

  export default SetupForm;