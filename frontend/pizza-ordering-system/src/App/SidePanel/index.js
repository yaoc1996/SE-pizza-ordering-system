import React, { Component } from 'react';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import login from './lib/login';
import signup from './lib/signup';

import {
  PanelView,
  ToggleButton,
  MaterialIcon,
} from './styled';

class SidePanel extends Component {
  constructor() {
    super();

    this.state = {
      visibleForm: 'signup',
    }

    this.setPanelState = this.setPanelState.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.ifLoginSuccess = this.ifLoginSuccess.bind(this);
    this.onSignup = this.onSignup.bind(this);
  }

  setPanelState(state) {
    this.setState(state);
  }

  onToggle() {
    this.props.setAppState(({ collapsedSidePanel }) => ({
      collapsedSidePanel: !collapsedSidePanel
    }))
  }

  ifLoginSuccess({ message, token, user }) {
    const {
      store,
      setAppState,
    } = this.props;

    window.localStorage.setItem('token', token);
    setAppState({
      user,
    })

    if (store) {
      //redirect to store
    }

    console.log(message);
  }

  onLogin(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    
    if (email && password) {
      login({
        email, 
        password
      })
        .then(json => {
          if (json.success) {
            this.ifLoginSuccess(json);
          } else {
            console.log(json.message)
          }
        })
    }
  }

  onSignup(e) {
    e.preventDefault();

    const username = e.target.username.value;
    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    
    if (password === confirmPassword) {
      signup({
        username,
        firstname,
        lastname,
        email,
        password,
      })
        .then(json => {
          if (json.success) {
            this.ifLoginSuccess(json);
          } else {
            console.log(json.message);
          }
        })
    }
  }

  render() {
    const {
      setPanelState,
      onLogin,
      onSignup,
    } = this;

    const { visibleForm } = this.state;

    const { collapsedSidePanel } = this.props;

    const sidePanelProps = {
      collapsedSidePanel,
    }

    const toggleButtonProps = {
      onClick: this.onToggle,
    }

    const loginFormProps = {
      setPanelState,
      onLogin,
    }

    const signupFormProps = {
      setPanelState,
      onSignup,
    }

    return (
      <PanelView { ...sidePanelProps } >
        <ToggleButton { ...toggleButtonProps } >
          <MaterialIcon>
            { collapsedSidePanel ? 'keyboard_arrow_left' : 'keyboard_arrow_right' }
          </MaterialIcon>
        </ToggleButton>

        {
          visibleForm === 'login'
            ? <LoginForm { ...loginFormProps } />
            : <SignupForm { ...signupFormProps } />
        }
      </PanelView>
    )
  }
}

export default SidePanel;