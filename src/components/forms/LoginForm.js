import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';

import './css/main';
import Loader from '../loader';
import ParseError from '../utils/ParseError';

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
				<form onSubmit={this.onSubmit} className="form">
					<Typography use="headline5" className="form__heading">Авторизация</Typography>

					{ParseError(errors.global)}
					
					<div className="form__item">
						<TextField 
							value={data.email} 
							onChange={this.onChange}
							className="form__field"
							required
							type="email"
							name="email" 
							label="Ваш E-Mail" 
						/>
					</div>

					<div className="form__item">
						<TextField 
							value={data.password}
							onChange={this.onChange}
							className="form__field"
							required
							type="password"
							name="password" 
							label="Ваш пароль" 
						/>
					</div>

					<div className="form__item form__buttons">
						<Button raised>Войти</Button>
					</div>

				</form>
			</Loader>
		)
	}
}

export default LoginForm
