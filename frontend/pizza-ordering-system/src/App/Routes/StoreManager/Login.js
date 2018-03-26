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

import postSMLogin from 'lib/postSMLogin';

const Login = props => {
  const {
    history,
  } = props;

  const goTo = dest => () => {
    history.push(dest);
  }

  const onLogin = e => {
    e.preventDefault();
    
    const email = e.target.email.value;
    const password = e.target.password.value;

    postSMLogin({
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
        onClick={goTo('/storemanager/signup')}>Sign Up to be a Store Manager</FloatRButton>
      <HVCenteredBox>
        <PageHeading
          style={{ color: '#F8BBD0' }} >Login</PageHeading>
        <Label>Welcome Back</Label>
        <br /><br />
        <Label
          color='#ddd'
          fontSize='12px' >Online Pizza Delivery System</Label>
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
        </HVCenteredBox>
    </Fragment>
  )
}

export default Login;