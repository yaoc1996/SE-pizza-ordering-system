import React, { Component } from 'react';

import {
  PanelView,
  ToggleButton,
  MaterialIcon,
} from './_styled';

class SidePanel extends Component {
  constructor() {
    super();

    this.state = {
      collapsed: true,
    }

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    this.setState(({ collapsed }) => ({
      collapsed: !collapsed
    }))
  }

  render() {
    const { collapsed } = this.state;
    const sidePanelProps = {
      collapsed,
    }
    const toggleButtonProps = {
      onClick: this.onToggle,
    }

    return (
      <PanelView { ...sidePanelProps } >
        <ToggleButton { ...toggleButtonProps } >
          <MaterialIcon>
            { collapsed ? 'keyboard_arrow_left' : 'keyboard_arrow_right' }
          </MaterialIcon>
        </ToggleButton>
      </PanelView>
    )
  }
}

export default SidePanel;