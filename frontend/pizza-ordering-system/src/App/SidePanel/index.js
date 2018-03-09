import React, { Component } from 'react';

import login from './lib/login';

import {
  PanelView,
  ToggleButton,
  MaterialIcon,
  LoginForm,
  LoginLabel,
  FormField,
  FieldLabel,
  FieldInput,
  FieldSubmitButton,
} from './styled';

class SidePanel extends Component {
  constructor() {
    super();

    this.state = {
      collapsed: false,
    }

    this.onToggle = this.onToggle.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onToggle() {
    this.setState(({ collapsed }) => ({
      collapsed: !collapsed
    }))
  }

  onLogin(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email && password) {
      login(email, password)
        .then(json => {
          console.log(json);
        })
    }
  }

  render() {
    const { collapsed } = this.state;

    const sidePanelProps = {
      collapsed,
    }

    const toggleButtonProps = {
      onClick: this.onToggle,
    }

    const formProps = {
      onSubmit: this.onLogin,
    }

    const emailInputProps = {
      name: 'email',
      type: 'text',
    }

    const passwordInputProps = {
      name: 'password',
      type: 'password',
    }

    const submitButtonProps = {
      type: 'submit',
    }

    return (
      <PanelView { ...sidePanelProps } >
        <ToggleButton { ...toggleButtonProps } >
          <MaterialIcon>
            { collapsed ? 'keyboard_arrow_left' : 'keyboard_arrow_right' }
          </MaterialIcon>
        </ToggleButton>

        <LoginForm { ...formProps } >
          <LoginLabel>Welcome!</LoginLabel>
          <FormField>
            <FieldLabel>Email</FieldLabel>
            <FieldInput { ...emailInputProps } />
          </FormField>
          <FormField>
            <FieldLabel>Password</FieldLabel>
            <FieldInput { ...passwordInputProps } />
          </FormField>
          <FormField>
          <FieldSubmitButton { ...submitButtonProps } >&nbsp;Log In</FieldSubmitButton>
          </FormField>
        </LoginForm>
      </PanelView>
    )
  }
}

export default SidePanel;