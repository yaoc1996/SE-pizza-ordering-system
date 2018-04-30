import React from 'react';

const PendingRequest = ({ last, children }) => {
  return (
    <div className='margin-md' >
      <label className='clickable font-darkblue' >
        { children }
      </label>
      <label className='font-grey' > wants to register with your store!</label>
      <br />
      <div className='align-right padding-xs' >
        <button className='btn-sm btn-blue font-xs margin-sm' >
          Approve
        </button>
        <button className='btn-sm btn-grey font-xs margin-sm' >
          Reject
        </button>
      </div>
      <div className='line-h' />
    </div>
  )
}

export default PendingRequest;