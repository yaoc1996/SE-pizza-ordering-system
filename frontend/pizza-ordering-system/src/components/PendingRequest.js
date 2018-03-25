import React from 'react';

import { 
  ClickableLabel,
  InlineCell,
  RequestBox,
  FloatRButton,
} from 'styled';

const PendingRequest = props => {
  return (
    <InlineCell bottom>
      <RequestBox>
        <ClickableLabel>{ props.children }</ClickableLabel>
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
            color='#555'
            background='#eee'
            hover='#bbb'
            active='white'
            height='24px' >Reject</FloatRButton>
          <FloatRButton
            color='white'
            background='#1E88E5'
            hover='#1565C0'
            active='#333'
            height='24px' >Approve</FloatRButton>
        </div>
      </RequestBox>
    </InlineCell>
  )
}

export default PendingRequest;