import React from 'react';

import { 
  ClickableLabel,
  ListBox,
  FloatRButton,
} from 'styled';

const PendingRequest = ({ last, children }) => {
  return (
    <ListBox
      last={last} >
      <ClickableLabel>{ children }</ClickableLabel>
      <label
        style={{
          color: '#666',
        }} > wants to register with your store!</label>

      <div
        style={{
          position: 'relative',
          height: 30,
        }} >
        <FloatRButton
          fontSize='10px'
          color='#555'
          background='#eee'
          hover='#bbb'
          active='white'
          height='24px' >Reject</FloatRButton>
        <FloatRButton
          fontSize='10px'        
          color='white'
          background='#1E88E5'
          hover='#1565C0'
          active='#333'
          height='24px' >Approve</FloatRButton>
      </div>
    </ListBox>
  )
}

export default PendingRequest;