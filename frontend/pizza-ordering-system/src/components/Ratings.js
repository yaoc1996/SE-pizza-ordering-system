import React, { Component } from 'react';

class Ratings extends Component {

	constructor(){
		super();
		this.state = {
			value: null,
			reason: '',
		}
	}

	render(){
		const { rating } = this.props;

		return (
			<div className="card padding-sm"
						style={{
							maxWidth: 480,
						}}>
			  <form className="card-body"
							onSubmit={this.props.submitRating}>
			    <br />
			    <label className='fit font-md'>
						Rate&nbsp;
						<label className='font-blue font-md'>{rating.subject}</label>&nbsp;
						{rating.store === '' ? '' : 'at '+rating.store}
					</label>
					<select className='padding-sm margin-md bg-white'
									name='value' >
						<option value='1'>1</option>
						<option value='2'>2</option>
						<option value='3'>3</option>
						<option value='4'>4</option>
						<option value='5'>5</option>
					</select>
					<div className="ui form">
			      <div className="field">
			        <div> Reason for Rating </div>
							<textarea name='reason' 
												style={{
													width: '80%',
												}}
												rows = "2"></textarea>
			      </div>
			    </div>
					<input className='hide' name='id' value={rating.id} readOnly/>
										
					<button className='btn-md btn-pink margin-sm'>
			      Send Feedback
			    </button>
			  </form>
			</div>



		)
	}

}
export default Ratings;