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
        
            <div class="ui cards">

            {
              samplePizzas.map(pizza =>
                <div className = "card">
                  <div className = "content">
                    <div className = "header" contenteditable="true" > {pizza.name} </div>
                    <div className = "description"> 
                      {pizza.description}
                      <br></br>
                      ${pizza.price}
                    </div>
                    
                    <div clasName = "extra content">
                      <div className = "ui two buttons">
                        <div className = "ui basic green button">Edit</div>
                        <div className = "ui basic red button">Delete</div>
                      </div>
                    </div>
                  </div>
                </div>

              )
            }
            </div>

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
  name: 'Honalulu Hawaiian',
  description: '12 inch Pizza with Ham and Pineapple',
  price: 9,
}, {
  name: 'Meat Lovers',
  description: '12 inch Pizza with Sausage, Ham, Bacon, and Pepperoni',
  price: 9,
}, {
  name: 'Buffalo Chicken',
  description: '12 inch Pizza with Chicken and Buffalo Sauce',
  price: 9,
}]