import React, { Component } from 'react';

import {
  List,
} from 'components';

class Dash extends Component {
  constructor() {
    super();

    this.state = {
      notifications: [],
      store: sampleStore,
    }

    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    console.log(this.props.match.params)

  }

  onLogout() {

  }

  render() {
    const { onLogout } = this;
    const { store } = this.state;

    return (
      <div className='fill' >
        <div  className='align-right'>
          <button className='btn-md btn-pink margin-sm'
                  onClick={onLogout} >
            Logout
          </button>
          <div className='line-h' />
        </div>

        <div className='align-left margin-lg padding-lg'>
          <div className='font-txl margin-lg padding-lg'>
            Menu
            <div className='line-h' />
            <List 
              bullet
              items={samplePizzas}
              Li={({children}) => 
                <div>
                  <label>{children.name}</label>
                  <label> {children.price}</label>
                </div>
              } />
            <div className='fill align-right'>
              Name: <input />
              <br />
              Price: <input />
              <br />
              <button>Edit Item</button>
              <button>Add Item</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dash;

const sampleStore = {
  name: 'Dominos',
  address: '123 abc st',
  manager: 'John Connor',
}

const samplePizzas = [{
  name: 'pepperoni',
  price: 6,
}, {
  name: 'pepperoni',
  price: 6,
}, {
  name: 'pepperoni',
  price: 6,
}, {
  name: 'pepperoni',
  price: 6,
}]