import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';

import './css/main';
import Loader from '../loader';
import ParseError from '../utils/ParseError';

export class PasswordForm extends Component {
	static propTypes = {
		submit: PropTypes.func.isRequired,
	}

	state = {
		data: {
			oldPassword: '',
			newPassword: '',
			confirmationPassword: ''
		},
		loading: false,
		errors: {}
	}

	onChange = e => {
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		})
	}

	onSubmit = e => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		if(Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submit(this.state.data)
				.catch(errors => this.setState({ errors, loading: false }));
		} else {
			this.setState({ errors })
		}
	
	}

	validate = data => {
		let errors = {};
		let password = data.newPassword;

		let reg = password.match(
			/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/
		);

		if(password.match(/\s/)) {
			errors.global = 'Пароль не может содержать пробелов';
			return errors;
		} else if(!reg || reg[0] !== password) {
			errors.global = 'Пароль должен содержать не менее восьми знаков, включать буквы, цифры и специальные символы'
			return errors;
		}

		return errors;
	}

	render() {
		const { data, loading, errors } = this.state;
		return (
			<Loader loading={loading}>
				<form onSubmit={this.onSubmit} className="form form__single form__password">
					<Typography 
						use="headline5" 
						tag="h1" 
						className="form__heading"
					>
						Измение пароля
					</Typography>

					{ParseError(errors.global)}

					<div className="form__item">
						<TextField
							value={data.oldPassword}
							onChange={this.onChange}
							className="form__field"
							required
							type="password"
							name="oldPassword"
							label="Ваш текущий пароль"
						/>
					</div>

					<div className="form__item">
						<TextField
							value={data.newPassword}
							onChange={this.onChange}
							required
							className="form__field"
							type="text"
							name="newPassword"
							label="Ваш новый пароль"
						/>
					</div>

					<div className="form__item">
						<TextField
							value={data.confirmationPassword}
							onChange={this.onChange}
							className="form__field"
							required
							type="text"
							name="confirmationPassword" 
							label="Повторите ваш новый пароль"
						/>
						{ParseError(errors.confirmationPassword)}
					</div>

					<div className="form__item form__buttons">
						<Button raised>Изменить пароль</Button>
					</div>

				</form>
			</Loader>
		)
	}
}

export default PasswordForm