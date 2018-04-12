import React, { Component } from 'react';

import List from './List';

class HireForm extends Component {
  constructor() {
    super();

    this.state = {
      selected: null,
      searches: sampleCooks,
    }

    this.setSelect = this.setSelect.bind(this);
  }

  setSelect(selected) {
    this.setState({
      selected,
    })
  }

  onOffer(e) {
    e.preventDefault();
    console.log(e.target);
  }

  render() {
    console.log('rendering HireForm');
    const {
      setSelect,
      onOffer,
    } = this;

    const {
      searches,
      selected,
    } = this.state;
    
    return (
      <div className='centered-hv bg-white edge-rounded padding-md' >
        <form className='align-left form'
              onSubmit={onOffer} >
          <br />

          <label className='font-bold font-md' >
            Hire
          </label>

          <br /><br />

          <div className='line-h' />
          <div className='margin-sm fit align-middle'>
            <i className='material-icons' >search</i>
          </div>
          
          <div className='fit margin-sm align-middle'>
            <select className='input-md' >
              <option value='cook'>Cook</option>
              <option value='delivery'>Delivery</option>
            </select>
          </div>

          <input  className='input-md margin-lg align-middle'
                  style={{ width: 'calc(100% - 180px)' }}
                  placeholder='Enter a name' />

          <div>
            <List
              id='search-results'
              selectedClassName='bg-lightblue'
              selected={selected}
              setSelect={setSelect}
              items={searches}
              Li={props => 
                <label className='padding-md fill align-right' >
                  { props.children }
                </label>
              } />
          </div>
          <br />
          <div className='block' >
            {
              selected !== null &&
              <div>
                <button className='btn-md btn-green align-middle'>Offer</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$
                <input  className='input-md margin-sm'
                        type='number'
                        placeholder='Amount'
                        required
                        autoFocus />
                / hour
              </div>
            }
          </div>
        </form>
      </div>
    )
  }
}

export default HireForm;

const sampleCooks = [
  'Alex',
  'Kenny',
  'Josh',
]