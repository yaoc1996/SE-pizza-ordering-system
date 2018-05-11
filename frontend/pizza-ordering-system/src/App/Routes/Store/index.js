import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';

import {
	withModal,
	getCheckRegistered,
	putStoreRegister,
	getStore,
	postOrder,
	parseQuery,
} from 'lib';

class StoreID extends Component{
	constructor(){
		super();

		this.state = {
			toggleCart: false,
			store: null,
			status: 'Visitor',
			loading: true,
			order: [],
			discount: 1,
		}

		this.toggleCart = this.toggleCart.bind(this);
		this.register = this.register.bind(this);
		this.getStore = this.getStore.bind(this);
		this.addToCart = this.addToCart.bind(this);
		this.removeFromCart = this.removeFromCart.bind(this);
		this.makeOrder = this.makeOrder.bind(this);
		this.addCustomPizza = this.addCustomPizza.bind(this);
	}

	componentDidMount() {
		this.props.setAppState({
			redirectDest: this.props.location.pathname+ this.props.location.search
		})
		this.props.addForm('request', props => 
			<div className='centered-hv bg-white padding-lg edge-rounded'>
				<p className='font-bold font-md'>
					You haven't registered with this store yet! Would you like to?
				</p>
				<button className='btn-md btn-pink font-md'
								onClick={this.register}>Sure!</button>&nbsp;&nbsp;
				<button className='btn-md btn-grey font-md'
								onClick={this.props.setForm(null)} >No Thanks</button>
			</div>
		)
		this.props.addForm('confirm', props => 
			<div className='centered-hv bg-white padding-lg edge-rounded'>
				<p className='font-bold font-md'>
					The store manager has been notified of your request.
				</p>
			</div>
		)

		this.props.addForm('checkout', props => {
			const subtotal = this.state.order.reduce((x, y) => x+parseFloat(y.price), 0) * this.state.discount
			const tax = subtotal * 0.0875;
			const total = subtotal + tax;

			return (
				<form className='centered-hv bg-white padding-lg edge-rounded'
							onSubmit={this.makeOrder} >
					<div>
						<label>Checkout</label>
						<div className='line-h' />
						<br />
						<label>Subtotal:</label>
						<div className='float-right'>${subtotal.toFixed(2)}</div>
						<br />
						<label>Tax:</label>
						<div className='float-right'>${tax.toFixed(2)}</div>				
						<br />				
						<label>Total: </label>
						<div className='float-right'>${total.toFixed(2)}</div>				
						<br />				
					</div>
					<div className='line-h' />	
					<br />
					<div className='align-left'>Address: </div>
						<input className='input-fill'
								name='destination'
								autoFocus
								required />
					<br />
					<br />
					<button className="ui button"
									onClick={this.props.checkout} >
						Place Order
					</button>
				</form>
			)
		})

		this.props.addForm('confirm-order', props => 
			<div className='centered-hv bg-white padding-lg edge-rounded'>
				<p className='font-bold font-md'>
					Order has been placed.
				</p>
			</div>
		)

		const token = localStorage.getItem('token');
		
		const { storeId } = parseQuery(this.props.location.search);
		console.log(parseQuery(this.props.location.search))

		if (token) {
			getCheckRegistered(token, storeId)
				.then(json => {
					if (json && json.success) {
						if (json.status === 'BlackListed') {
							alert(json.message)
							this.props.history.push('/home');
						} else if (json.status === 'NotRegistered') {
							this.props.setForm('request')();
						} else {
							if (json.statusUpdate) {
								alert(json.statusUpdate)	
							}
						}
						var discount = 1;
						if (json.status === 'Customer') {
							discount = 0.9;
						}

						if (json.status === 'VIP') {
							discount = 0.8;
						}
						this.setState({
							discount,
							status: json.status === 'NotRegistered' ? 'Visitor' : json.status,
						})
					}
					this.getStore()
				})
		}	else {
			this.getStore();
		}
	}

	getStore() {
		var userId = null;
		if (this.props.user) userId = this.props.user.id;

		const { storeId } = parseQuery(this.props.location.search)
		getStore({
			storeId,
			userId,
		})
			.then(json => {
				if (json && json.success) {
					if (json.store) {
						this.setState({
							store: json.store,
							popular: json.popular,
							pastOrders: json.pastOrders,
						})
					} else {
						alert('unable to find store')
						this.props.history.push('/home');
					}
				} else {
					console.log(json)
					json && alert(json.message);
					this.props.history.push('/home');
				}
				this.setState({
					loading: false,
				})
			})
	}

	register() {
		const token = localStorage.getItem('token');		
		const { storeId } = this.props.match.params;
		
		if (token) {
			putStoreRegister(token, storeId)
				.then(json => {
					if (!json.success) {
						alert(json.message)
					}
				})
		}

		this.props.setForm('confirm')();
	}

	toggleCart() {
		this.setState(state => ({
			toggleCart: !state.toggleCart,
		}))
	}

	addToCart(pizza) {
		return () => {
			this.setState(state => {
				state.order.push(pizza)
				return state;
			})
		}
	}

	removeFromCart(id) {
		return () => {
			this.setState(({order}) => {
				return {
					order: order.filter((x, ind) => ind !== id),
				}
			})
		}
	}

	addCustomPizza() {
		const d = document.getElementsByClassName('dough');
		const t = document.getElementsByClassName('toppings');
		const c = document.getElementsByClassName('chefs');

		var dough = null, toppings = [], chef = null;

		for (var i = 0; i < d.length; i++) {
			if (d[i].checked) {
				dough = {
					typeName: d[i].value
				};
				d[i].checked = false;
			}
		}
		for (i = 0; i < t.length; i++) {
			if (t[i].checked) {
				toppings.push({
					typeName: t[i].value
				});
				t[i].checked = false;
			}
		}
		for (i = 0; i < c.length; i++) {
			if (c[i].checked) {
				chef = {
					name: c[i].value
				};
				c[i].checked = false;
			}
		}

		if (dough && toppings.length > 0 && chef) {
			this.addToCart({
				name: 'Custom',
				description: 'custom',
				price: 12,
				toppings,
				dough,
				chef,
			})();
		}
	}

	makeOrder(e) {
		e.preventDefault();

		const subtotal = this.state.order.reduce((x, y) => x+parseFloat(y.price), 0)
		const tax = subtotal * 0.0875;
		const total = subtotal + tax;
		const destination = e.target.destination.value;
		
		const { storeId } = parseQuery(this.props.location.search)
		postOrder({
			storeId,
			userId: this.props.user ? this.props.user.id : null,
			subtotal,
			tax,
			total,
			destination,
			pizzas: this.state.order,
		})
			.then(json => {
				if (json && json.success) {
					this.setState({
						order: [], 
					})
					this.props.closeForm()();
				} else {
					json && alert(json.messsage);
				}
			})
	}

	render(){
		return (
		!this.state.loading &&
		<div className = 'fill bg-grey scrollable'>
			<br /><br /><br />
			<div className = 'align-right'
						style={{
							position: 'absolute',
							zIndex: 50,
							top: 0,
							right: 0,
						}}>
				{
					!this.props.user
						? <div className='float-right'>
								<Link to='/login'>
									<button className='btn-md margin-sm btn-red'>
										Login
									</button>
								</Link>
								<Link to='/signup'>
									<button className='btn-md margin-sm btn-red'>
										Signup
									</button> 
								</Link>
							</div>
						: <div className='float-right font-md'>
								<div className='fit margin-sm'>
									<label className='fade-in margin-0 fit'>
										Welcome! &nbsp;
										<label className='font-blue'>
											{this.props.user.firstname} {this.props.user.lastname}
										</label>
										&nbsp;
									</label>
									<br />
									<label className='fade-in margin-0 fit'>
										Current Status:&nbsp;
										<label className='font-red'>
											{this.state.status}
										</label>
										&nbsp;
									</label>
								</div>
								<button onClick={this.props.logout.bind(this, this.props.location.pathname)} 
												className='float-right btn-md margin-sm btn-red'>
									Logout
								</button>
							</div>
				}
			</div>
			<br />
			<div className="ui right aligned grid">
			  <div className="margin-lg">
			    <div className="column">
			      <div className="ui segment">
			      	<div className='align-left margin-lg padding-lg'>
							<div className='font-txl margin-lg padding-lg'>
	          				{ this.state.status === 'Visitor' ? 'Most Popular' : 'Past Orders' }
	          				<div className="ui cards">
		             		{
											 (this.state.status === 'Visitor'
													 ? this.state.popular
													 : this.state.pastOrders).map((pizza, id) => 
															<div 	className="card" 
																		key={`menu-${id}`}>
																<div className="content">
																	<div className="header">{pizza.name}</div>
																	<div className="description">
																		{pizza.description}
																		<br></br>
																		${(pizza.price * this.state.discount).toFixed(2)} 
																	</div>
																</div>
																<button className="ui bottom attached button"
																				onClick={this.addToCart(pizza)}>
																	<i className="add icon"></i>
																	Add to Cart
																</button>
															</div>
														)
		             		} 
             				</div>
									</div>
          				<div className='font-txl margin-lg padding-lg'>
	          				Menu
	          				<div className="ui cards">
		             		{
		             			this.state.store.menuItems.map((pizza, id) => 
									  <div 	className="card" 
													key={`menu-${id}`}>
									    <div className="content">
									      <div className="header">{pizza.name}</div>
									      <div className="description">
									        {pizza.description}
									        <br></br>
									        ${(pizza.price * this.state.discount).toFixed(2)} 
									      </div>
									    </div>
									    <button className="ui bottom attached button"
															onClick={this.addToCart(pizza)}>
									      <i className="add icon"></i>
									      Add to Cart
									    </button>
									  </div>

		             			)
		             		} 
             				</div>
	             				<br></br>
								<h1> Create Your Own </h1>


								<div className="card">
								  <div className="card-body">
								  	<br></br>
								    <h6 className="padding-sm">
								    	Select one type of dough, one chef, and unlimited toppings
								    </h6>
								    <div className="row">
										  <div className="col-sm-4">
										  	{
						             			chooseDough.map((dough, id) =>
						             				<label className="container"
																 				key={`dough-${id}`}>{dough.typeName}
														<input className='dough'
																		type="radio" 
																		name="radio" 
																		value={dough.typeName} />
													  <span className="checkmark"></span>
													</label>
						             			)
						             		}
										  </div>

										  <div className="col-sm-4">
										  	{
										  		this.state.store.workers.map((chef, id) =>
										  			<label className="container"
																		key={`chef-${id}`}>Chef {chef.lastname}
															<input className='chefs'
																			type="radio" 
																			name="chef"
																			value={chef.firstname + ' ' +chef.lastname}/>
										  				<span className="checkmark"></span>
										  			</label>
										  		)
										  	}
										  </div>

										  <div className="col-sm-4">
										  	{
										  		chooseToppings.map((toppings, id) =>
										  			<label className="container"
																		key={`topping-${id}`}> {toppings.typeName}
															<input className='toppings' 
																		type="checkbox" 
																		name='tops'
																		value={toppings.typeName}/>
										  				<span className="checkmark"></span>
										  			</label>
										  		)
										  	}
										  </div>
										</div>

								    <button className="ui bottom attached button"
														onClick={this.addCustomPizza}>
								      <i className="add icon"></i>
								      Add to Cart
								    </button>
								  </div>
								</div>

          					</div>
          			</div>
			      </div>
			    </div>
					<div className="column align-left" style={{
							position: 'absolute',
							left: 6,
							top: 6,
						}}>
						<button className='ui button align-right'
										onClick={this.toggleCart}>
							Cart
						</button>
						{
							this.state.toggleCart
								&& <div className="ui segment fade-in">
											<Checkout discount={this.state.discount}
																order={this.state.order}
																checkout={this.props.setForm('checkout')}
																removeFromCart={this.removeFromCart} />
									</div>
						}
					</div>
			  </div>
			</div>
		</div>






		)
	}

}
export default withModal(StoreID);

const chooseDough = [{
	typeName: 'Original',
}, {
	typeName: 'Whole Wheat',
}, {
	typeName: 'Gluten Free',
}]

const chooseToppings = [{
	typeName: 'Pepperoni',
}, {
	typeName: 'Peppers',
}, {
	typeName: 'Pineapple',
}, {
	typeName: 'Mushrooms',
}, {
	typeName: 'Sausage',
}, {
	typeName: 'Bacon',
}, {
	typeName: 'Olives',
}, {
	typeName: 'Onions',
}, {
	typeName: 'Chicken',
}, {
	typeName: 'Brocoli',
}]













