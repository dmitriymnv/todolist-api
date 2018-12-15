import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/signuppage';
import SignupForm from '../forms/SignupForm';

export class SignupPage extends Component {
	static propTypes = {

	}

	submit = (data) => {
		console.log(data);
		
	}

	render() {
		return (
			<div className="signupage center-container">
				<SignupForm submit={this.submit} />
			</div>
		)
	}
}

export default SignupPage
