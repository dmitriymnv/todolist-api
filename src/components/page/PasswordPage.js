import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PasswordForm from '../forms/PasswordForm';
import { resetPassword } from '../../ac/auth'

export class SignupPage extends Component {
	static propTypes = {
		signup: PropTypes.func.isRequired
	}

	submit = (data) => {
		return (
			this.props.resetPassword(data)
		)
	}

	render() {
		return (
			<div className="flex-container">
				<PasswordForm submit={this.submit} />
			</div>
		)
	}
}

export default connect(null, { resetPassword })(SignupPage)
