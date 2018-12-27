import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PasswordForm from '../forms/PasswordForm';
import { setPassword } from '../../ac/auth'

export class SignupPage extends Component {
	static propTypes = {
		signup: PropTypes.func.isRequired
	}

	submit = (data) => {
		return (
			this.props.setPassword(data)
				.then(() => this.props.push(
					'/tasks', { alertText: 'Вы успешно сменили свой пароль на новый!'}
				))
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

export default connect(null, { push, setPassword })(SignupPage)
