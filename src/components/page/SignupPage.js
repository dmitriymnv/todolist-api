import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signup } from '../../ac/user';
import { title } from '../../constans';
import SignupForm from '../forms/SignupForm';

export class SignupPage extends Component {
	static propTypes = {
		signup: PropTypes.func.isRequired
	}

	componentWillMount() {
		document.title = 'Регистрация' + title;
	}

	submit = (data) => {
		return (
			this.props.signup(data)
		)
	}

	render() {
		return (
			<div className="flex-container">
				<SignupForm submit={this.submit} />
			</div>
		)
	}
}

export default connect(null, { signup })(SignupPage)
