import React, { Fragment } from 'react';

import {
  HVCenteredBox,
  PageHeading,
  Label,
  FloatRButton,
} from 'styled';

import {
  SetupForm,
} from 'components';

const Setup = props => {
  const onSetup = () => {

  }
  return (
    <Fragment>
      <HVCenteredBox>
        <PageHeading
          color='#EC407A' >New Store</PageHeading>
        <Label>Enter Your Store</Label>
        <br /><br />
        <Label
          color='#ddd'
          fontSize='12px' >Online Pizza Delivery System</Label>
        <SetupForm
          onSubmit={onSetup}
          color='white'
          background='#EC407A'
          hover='#F48FB1'
          active='#333' />
      </HVCenteredBox>
    </Fragment>
  )
}

export default Setup;