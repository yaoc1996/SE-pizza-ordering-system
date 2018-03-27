import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import {
  HVCenteredBox,
  PageHeading,
  Label,
  FloatRButton,
} from 'styled';

import { 
  postSMSignup
} from 'lib';

import {
  SignupForm,
} from 'components';

const Signup = props => {
  const {
    history,
  } = props;

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
      <Link to='/storemanager/login'>
        <FloatRButton
          color='white'
          background='#EC407A'
          hover='#F48FB1'
          active='#333' >Login</FloatRButton>
      </Link>
      <HVCenteredBox>
        <PageHeading
          color='#EC407A' >Signup</PageHeading>
        <Label>Become a Store Manager!</Label>
        <br /><br />
        <Label
          color='#ddd'
          fontSize='12px' >Online Pizza Delivery System</Label>
        <SignupForm
          onSubmit={onSignup}
          color='white'
          background='#EC407A'
          hover='#F48FB1'
          active='#333' />
      </HVCenteredBox>
    </Fragment>
  )
}

export default Signup;