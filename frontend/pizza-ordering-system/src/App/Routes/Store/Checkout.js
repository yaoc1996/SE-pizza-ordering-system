import React, { Component } from 'react';

class Checkout extends Component{

	constructor(){
		super();
		this.state ={

		}
	}

	render(){
		const subtotal = this.props.order.reduce((x, y) => x+parseFloat(y.price), 0) * this.props.discount
		const tax = subtotal * 0.0875;
		const total = subtotal + tax;

		return (
			<div style={{
						minWidth: 300,
					}}>

				<h3> Your Order </h3>
				<div className='line-h' />

			
				<div className="ui middle aligned divided list">
				{
					this.props.order.length > 0
						? this.props.order.map((order, id) =>
								<div className="item" key={`item-${id}`}>
										<div className="left floated content">
											<button className="ui icon button"
															onClick={this.props.removeFromCart(id)}>
												<i className="trash icon"></i>
											</button>
										</div>
										<div className="content">
											<h6> {order.name} </h6>
											<br />
											{order.description}
										</div>
										<div className = "right floated content">
											<h6> ${(order.price * this.props.discount).toFixed(2)} </h6>
										</div> 
									</div>
							)
						: <div className='padding-md'>
								Your cart is empty!
							</div>

				}
				<br />
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
				<button className="ui button"
								disabled={this.props.order.length === 0}
								onClick={this.props.checkout} >
				  Place Order
				</button>
			
		</div>
		)
	}

}
export default Checkout;










