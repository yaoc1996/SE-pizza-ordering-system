import React from 'react';

import {
  ListBox,
  Label,
  FloatRButton,
} from 'styled';

import List from './List';

const PendingOrder = ({ last, children }) => {
  const {
    firstname,
    lastname,
    pizzas,
  } = children;

  return (
    <ListBox
      last={last} >
      <Label
        color='#666'
        fontSize='12px' >{ firstname } { lastname }</Label>
      <label
        style={{
          color: '#666',
        }} > placed an order for</label>

      <div
        style={{
          position: 'absolute',
          bottom: 6,
          right: 0,
        }} >
        <FloatRButton
          fontSize='10px'        
          color='white'
          background='#1E88E5'
          hover='#1565C0'
          active='#333'
          height='24px' >Assign Delivery</FloatRButton>
      </div>

      <List
        list={pizzas}
        ListItem={props => 
          <Label
            color='#C2185B'
            fontSize='12px' 
            children={props.children + ' pizza'} />
        } />

    </ListBox>
  )
}

export default PendingOrder;