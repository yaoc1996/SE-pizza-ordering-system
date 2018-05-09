import React from 'react';

const Feedback = props => {
  const {
    children,
  } = props;

  const {
    source,
    reason,
  } = children;
  
  return (
    <div className='padding-sm'>
      <label className={ 'padding-sm fit font-grey'}>
        Comment: &nbsp; 
        <div className='padding-sm' >
          { reason }
        </div>
      </label>
      <br />
      <div className='align-right padding-sm'>
        <label className='font-red font-sm margin-0 float-left'> Rating: {children.value}</label>
        <label className='font-blue font-sm margin-0' >{ source }</label>&nbsp;
      </div> 
      <div className='line-h' />
    </div>
  )
}

export default Feedback;