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

		return (
			<div className="card text-center">
			  <div className="card-header">
			    <h3>We Need Your Feedback!</h3>
			  </div>
			  <div className="card-body">
			    <br />
			    <h6> Rate your experience </h6>
			    <form>
			      <label className="radio-inline">
			        <input type="radio" name="optradio" value='1' />1
			      </label>
			      <label className="radio-inline">
			        <input type="radio" name="optradio" value='2' />2
			      </label>
			      <label className="radio-inline">
			        <input type="radio" name="optradio" value='3' />3
			      </label>
			      <label className="radio-inline">
			        <input type="radio" name="optradio" value='4' />4
			      </label>
			      <label className="radio-inline">
			        <input type="radio" name="optradio" value='5'/>5
			      </label>
			    </form>
			    <br />
			    <br />
			    <div className="ui form">
			      <div className="field">
			        <h6> Reason for Rating </h6>
			        <textarea rows = "2"></textarea>
			      </div>
			    </div>
			    <br />
			    <button classNameName='btn-md btn-pink margin-sm'>
			            Send Feedback
			    </button>
			  </div>
			</div>



		)
	}

}
export default Ratings;