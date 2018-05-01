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
      <div className='fill bg-grey' >
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
        
            <div className="ui cards">

            {
              samplePizzas.map(pizza =>
                <div className = "card">
                  <div className = "content">
                    <div className = "header"> {pizza.name} </div>
                    <div className = "description"> 
                      {pizza.description}
                      <br></br>
                      ${pizza.price}
                    </div>
                    
                    <div className = "extra content">
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
            <br />
            <h1> Add Item to Menu </h1>
            <div className="ui card">
              <div className = "content">
                <div className = "header"> 
                  <div className = "description">

                    <div class="ui input">
                      <input type="text" placeholder="Name" />
                    </div>
                    <br />
                    <div className="ui input">
                      <input type="text" placeholder="Description" />
                    </div>
                    <br />
                    <div className="ui input">
                     <input type="text" placeholder="Price" />
                    </div>
                  </div>

                  <div className="ui bottom attached button">
                    <i className="add icon"></i>
                    Add Item
                  </div>
                </div>
              </div>
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