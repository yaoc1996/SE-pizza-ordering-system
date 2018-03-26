import React, { Component, Fragment } from 'react';

import {
  InlineBlock,
  Block,
  MarginBox,
  MaterialIcon,
  Label,
  HR,
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
    } = this.props;

    return (
      <Fragment>
        <HR />
        <Block
          onClick={toggle}           
          background='white'>
          <MaterialIcon
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}>
            { collapsed ? 'arrow_drop_up' : 'arrow_drop_down' }
          </MaterialIcon>
          <MarginBox>
            <Label
              fontSize={fontSize} >{ name }</Label>
          </MarginBox>
        </Block>
        {
          !collapsed && children &&
          <Fragment>
            <HR />
            { children }
          </Fragment>
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
}