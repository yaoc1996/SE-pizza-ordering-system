import React, { Component } from 'react';

class Checkout extends Component{

	constructor(){
		super();
		this.state ={

		}
	}

	render(){
		return (
			<div>

				<h3> Your Order </h3>
				<div className='line-h' />

			
				<div className="ui middle aligned divided list">
				{
					sampleOrder.map(order =>
					<div className="item">
					    <div className="left floated content">
					      <button className="ui icon button">
						  	<i class="trash icon"></i>
						  </button>
					    </div>
					    <div className="content">
					      <h6> {order.name} </h6>
					      <br />
					      {order.description}
					    </div>
					    <div className = "right floated content">
					    	<h6> ${order.price} </h6>
					    </div> 
				    </div>

					)
				}
				</div>
				<button className="ui button">
				  Place Order
				</button>
			
		</div>
		)
	}

}
export default Checkout;

const sampleOrder = [{
	name: 'Honalulu Hawaiian',
	description: '12 inch Pizza with Ham and Pineapple',
	price: 9,
}, {
	name: 'Create Your Own',
	description: 'Regular Dough, Pepperon, Pineapple',
	price: 8,
}, {
  name: 'Buffalo Chicken',
  description: '12 inch Pizza with Chicken and Buffalo Sauce',
  price: 9,
}]













