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
      background={positive ? '#E8F5E9' : '#FFEBEE'}
      last={last} >
      <Label
        color='#455A64'
        fontSize='12px' >{ children.name } said:</Label>
      <br />
      <PaddingBox>
        <label
          style={{
            color: '#666',
          }} >{ children.msg }</label>
      </PaddingBox>
    </ListBox>
  )
}

export default Feedback;