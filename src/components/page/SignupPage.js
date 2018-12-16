import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './css/signuppage';
import SignupForm from '../forms/SignupForm';
import { signup } from '../../ac/user.js'

export class SignupPage extends Component {
	static propTypes = {
		signup: PropTypes.func.isRequired
	}

	submit = (data) => {
		return (
			this.props.signup(data)
		)
	}

	render() {
		return (
			<div className="signupage center-container">
				<SignupForm submit={this.submit} />
			</div>
		)
	}
}

export default connect(null, { signup })(SignupPage)
