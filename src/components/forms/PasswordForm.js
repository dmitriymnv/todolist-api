import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/main';
import Loader from '../loader';
import SvgEyeOpen from '../../other/img/eye-solid';
import SvgEyeClose from '../../other/img/eye-slash-solid';
import ParseError from '../utils/ParseError';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import { Icon } from '@rmwc/icon';

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
				<form onSubmit={this.onSubmit} className="default-form password-form">
					<Typography use="headline5" className="headline-form">Измение пароля</Typography>

					{ParseError(errors.global)}

					<div className="default-form__item">
						<TextField
							value={data.oldPassword}
							onChange={this.onChange}
							className="default-form__field"
							required
							type="password"
							name="oldPassword"
							label="Ваш текущий пароль"
						/>
					</div>

					<div className="default-form__item">
						<TextField
							value={data.newPassword}
							onChange={this.onChange}
							required
							className="default-form__field customfield-icon"
							type="text"
							name="newPassword"
							label="Ваш новый пароль"
						/>
					</div>

					<div className="default-form__item">
						<TextField
							value={data.confirmationPassword}
							onChange={this.onChange}
							className="default-form__field"
							required
							type="text"
							name="confirmationPassword" 
							label="Повторите ваш новый пароль"
						/>
						{ParseError(errors.confirmationPassword)}
					</div>

					<div className="default-form__item default-form__button">
						<Button raised>Изменить пароль</Button>
					</div>
				</form>
			</Loader>
		)
	}
}

export default PasswordForm