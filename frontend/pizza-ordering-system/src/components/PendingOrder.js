import React from 'react';
import List from './List';

const PendingOrder = ({ last, children, delivery, assignTask }) => {
  const {
    items,
  } = children;

  const name = 
    children.customer 
      ? `${children.customer.firstname} ${children.customer.lastname}`
      : 'Visitor'

  return (
    <div className='padding-sm' >
      <label className='font-blue' >{ name }</label>
      <label className='font-grey' >&nbsp;placed an order for</label>


      <List bullet
            items={items}
            Li={props => 
              <div>
                <label className='fit' >{props.children.name}</label>
                <br />
                <p>{props.children.description}</p>
              </div> 
            } />

      <form className='align-right '
            onSubmit={assignTask(children.id)} >
        <select className='padding-sm bg-white' name='delivery'>
          {
            delivery.map((delivery, id) => {
              return (
                <option value={delivery.id} key={`delivery-option-${id}`}>
                  { delivery.firstname } {delivery.lastname}
                </option>
              )
            })
          }
        </select>
        <button className='font-xs btn-sm btn-blue margin-sm' >
          Assign Delivery
        </button>
      </form>
      
      <div className='line-h' />
    </div>
  )
}

export default PendingOrder;
