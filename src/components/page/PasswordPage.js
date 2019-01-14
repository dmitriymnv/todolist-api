import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import PasswordForm from '../forms/PasswordForm';
import { setPassword } from '../../ac/user';
import { title } from '../../constans';

export class PasswordPage extends Component {
	static propTypes = {
		push: PropTypes.func.isRequired,
		setPassword: PropTypes.func.isRequired,
	}

	componentWillMount() {
		document.title = 'Изменение пароля' + title;
	}

	submit = (data) => {
		return (
			this.props.setPassword(data)
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

export default connect(null, { push, setPassword })(PasswordPage)
