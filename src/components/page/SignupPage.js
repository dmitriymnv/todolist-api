import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/signuppage';
import SignupForm from '../forms/SignupForm';

export class SignupPage extends Component {
	static propTypes = {

	}

	render() {
		return (
			<div className="signupage center-container">
				<div className="signuppage--widow">
					
					<SignupForm />

				</div>
			</div>
		)
	}
}

export default SignupPage
