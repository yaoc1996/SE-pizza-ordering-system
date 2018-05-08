import React from 'react';

const PendingRequest = ({ last, children, handleRequest }) => {
  return (
    <div className='margin-md' >
      <label className='clickable font-darkblue' >
        { children.firstname + ' ' + children.lastname }
      </label>
      <label className='font-grey' >&nbsp;wants to register with your store!</label>
      <br />
      <div className='align-right padding-xs' >
        <button className='btn-sm btn-blue font-xs margin-sm' 
                onClick={handleRequest('/approve', children.id)} >
          Approve
        </button>
        <button className='btn-sm btn-grey font-xs margin-sm' 
                onClick={handleRequest('/reject', children.id)} >
          Reject
        </button>
      </div>
      <div className='line-h' />
    </div>
  )
}

export default PendingRequest;