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
  FloatRButton,
} from 'styled';

import postSMSignup from 'lib/postSMSignup';

const Signup = props => {
  const {
    history,
  } = props;

  const goTo = (dest) => () => {
    history.push(dest);
  }

  const onSignup = e => {
    e.preventDefault();
    
    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    postSMSignup({
      firstname,
      lastname,
      email,
      password,
    })
      .then(json => {
        if (json && json.success) {

        }
        console.log(json);
      })
  }

  return (
    <Fragment>
      <FloatRButton
        onClick={goTo('/storemanager/login')}>Login as a Store Manager</FloatRButton>
      <HVCenteredBox>
        <PageHeading
          style={{ color: '#F8BBD0' }} >Sign Up</PageHeading>
        <LogoLabel>Become a Store Manager!</LogoLabel>
        <AppNameLabel>Online Pizza Delivery System</AppNameLabel>
        <Form
          onSubmit={onSignup} >
          <FormField>
            <FFLabel>Firstname:</FFLabel>
            <FFInput
              autoFocus
              type='text'
              name='firstname'
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
          <FormButton>Signup</FormButton>
        </Form>
      </HVCenteredBox>
    </Fragment>
  )
}

export default Signup;