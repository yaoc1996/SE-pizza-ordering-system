import React from 'react';

const Setup = props => {
  const onSetup = () => {

  }
  return (
    <div className='centered-hv fade-in' >
      <label className='font-txl font-bold font-lightgrey' >Setup</label>
      <br /><br />
      <label className='font-lg font-bold' >New Store</label>
      <br /><br />
      <label className='font-xs font-bold font-lightgrey' >
        Online Pizza Delivery System
      </label>
      <br /><br /><br />
      <form className='form'
            onSubmit={onSetup} >
        <div className='form-field'>
          <label>Store Name:</label>
          <input  type='text'
                  name='name'
                  autoFocus
                  required />
        </div>
        <div className='form-field'>
          <label>Address:</label>
          <input  type='text'
                  name='address'
                  required />
        </div>
        <div className='form-field'>
          <label className='align-top' >Description:</label>
          <textarea type='text'
                    name='description' />
        </div>
        <br /><br /><br />        
        <button className='btn-pink btn-md' >Submit</button>
      </form>
    </div>
  )
}

export default Setup;