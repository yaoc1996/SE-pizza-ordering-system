import React from 'react';

import {
  ListBox,
  Label,
  PaddingBox,
  HR,
} from 'styled';

const Feedback = props => {
  const {
    last,
    children,
  } = props;

  const {
    name,
    msg,
    positive,
  } = children;

  return (
    <ListBox
      background='white'
      last={last} >
      <Label
        color='#455A64'
        fontSize='12px' >{ children.name } said:</Label>
      <br />
      <PaddingBox>
        <label
          style={{
            color: positive ? '#66BB6A' : '#EF5350',
          }} >{ children.msg }</label>
      </PaddingBox>
    </ListBox>
  )
}

export default Feedback;