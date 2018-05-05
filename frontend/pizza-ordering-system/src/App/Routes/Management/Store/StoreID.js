import React, { Component } from 'react';
import Checkout from './Checkout';


import{
	List, 
} from 'components';

class StoreID extends Component{

	constructor(){
		super();

		this.state = {
			storeID: sampleID,	

		}

	}

	componentDidMount() {
		console.log(this.props.match.params)
	}

	onLogout(){

	}

	render(){
		const { storeID } = this.state;

		return (
		<div className = 'fill bg-grey'>
			<div className = 'align-right'>
				<button className = 'btn-md btn-pink margin-sm'>
					Logout 
				</button>
			</div>
			<div className="ui right aligned grid">
			  <div className="left floated aligned two column row">
			    <div className="column">
			      <div className="ui segment">
			      	<div className='align-left margin-lg padding-lg'>
          				<div className='font-txl margin-lg padding-lg'>
	          				Menu
	          				<br />
	          				<h1> Most Popular </h1>
	          				<div className="ui cards">
		             		{
		             			samplePizzas.map(pizza => 
									  <div className="card" >
									    <div className="content">
									      <div className="header">{pizza.name}</div>
									      <div className="description">
									        {pizza.description}
									        <br></br>
									        ${pizza.price} 
									      </div>
									    </div>
									    <div className="ui bottom attached button">
									      <i className="add icon"></i>
									      Add to Cart
									    </div>
									  </div>

		             			)
		             		} 
             				</div>
	             				<br></br>
								<h1> Create Your Own </h1>


								<div className="card">
								  <div className="card-body">
								  	<br></br>
								    <h6 className="card-text">
								    	Select one type of dough, one chef, and unlimited toppings
								    </h6>
								    <div className="row">
										  <div className="col-sm-4">
										  	{
						             			chooseDough.map(dough =>
						             				<label className="container">{dough.name}
													  <input type="radio" name="radio" />
													  <span className="checkmark"></span>
													</label>
						             			)
						             		}
										  </div>

										  <div className="col-sm-4">
										  	{
										  		chooseChef.map(chef =>
										  			<label className="container">Chef {chef.name}
										  				<input type="radio" name="radio" />
										  				<span className="checkmark"></span>
										  			</label>
										  		)
										  	}
										  </div>

										  <div className="col-sm-4">
										  	{
										  		chooseToppings.map(toppings =>
										  			<label className="container"> {toppings.name}
										  				<input type="checkbox" />
										  				<span className="checkmark"></span>
										  			</label>
										  		)
										  	}
										  </div>
										</div>

								    <div className="ui bottom attached button">
								      <i className="add icon"></i>
								      Add to Cart
								    </div>
								  </div>
								</div>

          					</div>
          			</div>
			      </div>
			    </div>
			    <div className="column">
			      <div className="ui segment">
			      	<Checkout />
			      </div>
			    </div>
			  </div>
			</div>
		</div>






		)
	}

}
export default StoreID;

const sampleID = {
	id: '123456',
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

const chooseDough = [{
	name: 'Original',
}, {
	name: 'Whole Wheat',
}, {
	name:'Gluten Free',
}]

const chooseChef = [{
	name: 'Joe',
}, {
	name: 'Bob',
}, {
	name:'Rob',
}]

const chooseToppings = [{
	name: 'Pepperoni',
}, {
	name: 'Peppers',
}, {
	name:'Pineapple',
}]













