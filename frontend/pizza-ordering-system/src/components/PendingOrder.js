import React from 'react';
import List from './List';

const PendingOrder = ({ last, children }) => {
  const {
    firstname,
    lastname,
    pizzas,
  } = children;

  return (
    <div className='padding-sm' >
      <label className='font-blue' >{ firstname } { lastname }</label>
      <label className='font-grey' > placed an order for</label>


      <List bullet
            items={pizzas}
            Li={props => 
              <label className='fit margin-xs' >{props.children + ' pizza'}</label>
            } />

      <div className='align-right ' >
        <button className='font-xs btn-sm btn-blue margin-sm' >
          Assign Delivery
        </button>
      </div>
      
      <div className='line-h' />
    </div>
  )
}

export default PendingOrder;