import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/main';
import Loader from '../loader';
import SvgEyeOpen from '../../other/img/eye-solid.svg';
import SvgEyeClose from '../../other/img/eye-slash-solid.svg';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import { Icon } from '@rmwc/icon';

export class SignupForm extends Component {
	static propTypes = {
		submit: PropTypes.func.isRequired,
	}

	state = {
		data: {
			email: '',
			username: '',
			password: '',
			confirmationPassword: ''
		},
		loading: false,
		showPassword: false,
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
				.catch(err => this.setState({ errors: err, loading: false }));
		} else {
			this.setState({ errors })
		}
	
	}

	validate = data => {
		let errors = {};
		let password = data.password;

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

		if(data.username.length < 5) {
			errors.global = "Имя пользователя должно содержать не менее пяти знаков";
			return errors;
		}

		if(password !== data.confirmationPassword) {
			errors.confirmationPassword = "Ваши пароли не совпадают"
			return errors;
		}

		return errors;
	}

	render() {
		const { data, showPassword, loading, errors } = this.state;
		return (
			<Loader loading={loading}>
				<form onSubmit={this.onSubmit} className="signup-form">
					<Typography use="headline5" className="headline-form">Регистрация</Typography>

					{ errors.global && 
						<div className="errors-form global">{errors.global}</div>
					}

					<div className="signup-form__item">
						<TextField
							value={data.email}
							onChange={this.onChange}
							className="signup-form__field"
							required
							type="email"
							name="email"
							label="Ваш E-mail"
						/>
						<TextField
							value={data.username}	
							onChange={this.onChange}
							required
							type="text"
							name="username"
							label="Имя пользователя"
						/>
					
					</div>

					<div className="signup-form__item">
						<TextField
							value={data.password}
							onChange={this.onChange}
							required
							className="signup-form__field customfield-icon"
							onBlur={this.onBlurPassword}
							withTrailingIcon={
								<Icon 
									onClick={() => this.setState({ showPassword: !this.state.showPassword})}
									className="field-icon" 
									icon={showPassword ?
										<SvgEyeClose width={18} height={18} /> : <SvgEyeOpen width={18} height={18}  />
									} 
								/>
							}
							type={showPassword ? "text" : "password"}
							name="password"
							label="Пароль"
						/>
						<TextField
							value={data.confirmationPassword}
							onChange={this.onChange}
							className="signup-form__field"
							required
							type={showPassword ? "text" : "password"}
							name="confirmationPassword" 
							label="Повторите пароль"
						/>
						{errors.confirmationPassword && 
							<div className="errors-form global">
								{errors.confirmationPassword}
							</div>
						}
					</div>

					<div className="signup-form__item signup-form__button">
						<Button raised>Зарегистрироваться</Button>
					</div>
				</form>
			</Loader>
		)
	}
}

export default SignupForm