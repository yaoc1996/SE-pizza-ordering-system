import React from 'react';

const Feedback = props => {
  const {
    children,
  } = props;

  const {
    name,
    msg,
    positive,
  } = children;

  return (
    <div className='padding-sm'>
      <label>{ name } said:</label>
      <br />
      <label className={ 'padding-sm fit ' + (positive ? 'font-green' : 'font-red') }>
        { msg }
      </label>
      <br />
      <div className='line-h' />
    </div>
  )
}

export default Feedback;