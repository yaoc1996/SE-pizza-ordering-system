import React, { Component, Fragment } from 'react';

import {
  DashHeader,
  FloatRButton,
  InlineBlock,
  Block,
} from 'styled';

import {
  DropDown,
} from 'components';

class Dash extends Component {
  constructor() {
    super();

    this.state = {
      notifications: [],
      store: null,
    }
  }

  componentDidMount() {
    console.log(this.props.match.params)

  }

  render() {
    return (
      <Fragment>
        <DashHeader
          onClick={this.abc}>
          Dash Header
          <FloatRButton
            abc={this.state.abc}
            color='white'
            background='#EC407A'
            hover='#F48FB1'
            active='#333' >Log Out</FloatRButton>
        </DashHeader>
        
        <InlineBlock
          height='100%' >

          <DropDown
            title='Job Offers' >


          </DropDown>
        </InlineBlock>
      </Fragment>
    )
  }
}

export default Dash;