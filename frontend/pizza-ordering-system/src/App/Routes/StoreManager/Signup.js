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
        color='#455A64'
        background='#CFD8DC'
        hover='#90A4AE'
        active='white' 
        onClick={goTo('/storemanager/login')}>Log In as a Store Manager</FloatRButton>
      <HVCenteredBox>
        <PageHeading
          style={{ color: '#F8BBD0' }} >Signup</PageHeading>
        <Label>Become a Store Manager!</Label>
        <br /><br />
        <Label
          color='#ddd'
          fontSize='12px' >Online Pizza Delivery System</Label>
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
          <FormButton
            color='white'
            background='#64B5F6'
            hover='#0277BD'
            active='#333' >Signup</FormButton>
        </Form>
      </HVCenteredBox>
    </Fragment>
  )
}

export default Signup;