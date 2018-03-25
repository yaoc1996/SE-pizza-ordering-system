import React, { Component, Fragment } from 'react';

import {
  InlineCell,
  DropDownIcon,
  Label,
} from 'styled';

class DropDown extends Component {
  constructor({ collapsed }) {
    super();

    this.state = {
      collapsed,
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(({ collapsed }) => ({
      collapsed: !collapsed,
    }))
  }

  render() {
    const { toggle } = this;
    const { collapsed } = this.state;
    const {
      name,
      color,
      fontSize,
      children,
      bottom,
    } = this.props;

    return (
      <Fragment>
        <InlineCell
          background='white'
          bottom >
          <DropDownIcon
            onClick={toggle} 
            fontSize={fontSize} >
            { collapsed ? 'arrow_drop_up' : 'arrow_drop_down' }
          </DropDownIcon>
          <Label
            fontSize={fontSize} >{ name }</Label>
        </InlineCell>
        {
          !collapsed && children &&
          <InlineCell
            bottom={bottom} >{ children }</InlineCell>
        }   
      </Fragment>
    )
  }
}

export default DropDown;

DropDown.defaultProps = {
  name: 'DropDown',
  color: '#333',
  fontSize: 12,
  collapsed: false,
  bottom: true,
}