import React, { Component, Fragment } from 'react';

import {
  PageHeading,
  LogoLabel,
} from 'styled';
import { AppNameLabel } from '../../styled';

class Login extends Component {
  render() {
    return (
      <Fragment>
        <PageHeading>Login</PageHeading>
        <LogoLabel>OPDS</LogoLabel>
        <AppNameLabel>Online Pizza Delivery System</AppNameLabel>
      </Fragment>
    )
  }
}

export default Login;