import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/main';
import Loader from '../loader';
import ParseError from '../utils/ParseError';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';

export class LoginForm extends Component {
	static propTypes = {
		submit: PropTypes.func.isRequired
	}

	state = {
		data: {
			email: '',
			password: ''
		},
		loading: false,
		errors: {}
	}

	onChange = e => {
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		})
	}

	onSubmit = (e) => {
		e.preventDefault();
		this.setState({ loading: true });	
		this.props.submit(this.state.data)
			.catch(errors => this.setState({ errors, loading: false }));
	}

	render() {
		const { data, loading, errors } = this.state;
		return (
			<Loader loading={loading}>
				<form className="login-form" onSubmit={this.onSubmit}>
					<Typography use="headline5" className="headline-form">Авторизация</Typography>

					{ParseError(errors.global)}
					
					<TextField 
						value={data.email} 
						onChange={this.onChange}
						required
						type="email"
						name="email" 
						label="Ваш E-Mail" 
					/>

					<TextField 
						value={data.password}
						onChange={this.onChange}
						required
						type="password"
						name="password" 
						label="Ваш пароль" 
					/>
					<Button raised>Войти</Button>
				</form>
			</Loader>
		)
	}
}

export default LoginForm
