import React, { Component } from 'react';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

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
  }

  setPanelState(state) {
    this.setState(state);
  }

  onToggle() {
    this.props.setAppState(({ collapsedSidePanel }) => ({
      collapsedSidePanel: !collapsedSidePanel
    }))
  }

  render() {
    const {
      setPanelState,
      onLogin,
      onSignup,
    } = this;

    const { visibleForm } = this.state;

    const { 
      collapsedSidePanel,
      setAppState,
    } = this.props;

    const sidePanelProps = { collapsedSidePanel }

    const toggleButtonProps = {
      onClick: this.onToggle,
    }

    const loginFormProps = {
      setAppState,
      setPanelState,
      onLogin,
    }

    const signupFormProps = {
      setAppState,
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