import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import { Icon } from '@rmwc/icon';
import { Checkbox } from '@rmwc/checkbox';

import './css/main';
import Loader from '../loader';
import SvgEyeOpen from '../../other/img/eye-solid';
import SvgEyeClose from '../../other/img/eye-slash-solid';
import ParseError from '../utils/ParseError';

export class SignupForm extends Component {
	static propTypes = {
		submit: PropTypes.func.isRequired,
	}

	state = {
		data: {
			email: '',
			username: '',
			password: '',
			confirmationPassword: '',
			subNews: true
		},
		privacyPolicy: false,
		loading: false,
		showPassword: false,
		errors: {}
	}

	onChange = (e, type) => {
		if(type == 'checked') {
			this.setState({
				data: { ...this.state.data, [e.target.name]: e.target.checked }
			})
		} else {
			this.setState({
				data: { ...this.state.data, [e.target.name]: e.target.value }
			})
		}
	}

	onSubmit = e => {
		e.preventDefault();
		const errors = this.validate(this.state.data, this.state.privacyPolicy);

		if(Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submit(this.state.data)
				.catch(errors => this.setState({ errors, loading: false }));
		} else {
			this.setState({ errors })
		}
	
	}

	validate = (data, privacy) => {
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

		if(!privacy) {
			errors.global = "Вы не приняли условия политики конфиденциальности";
			return errors;
		}

		return errors;
	}

	render() {
		const { 
			data, showPassword, loading, errors, privacyPolicy 
		} = this.state;
		return (
			<Loader loading={loading}>
				<form onSubmit={this.onSubmit} className="form form__single form__signup">
					<Typography use="headline5" tag="h1" className="form__heading">Регистрация</Typography>

					{ParseError(errors.global)}
					{ParseError(errors.email)}
					{ParseError(errors.username)}

					<div className="form__item">
						<TextField
							value={data.email}
							onChange={this.onChange}
							className="form__field"
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

					<div className="form__item">
						<TextField
							value={data.password}
							onChange={this.onChange}
							required
							className="form__field form__field_icon"
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
							required
							type={showPassword ? "text" : "password"}
							name="confirmationPassword" 
							label="Повторите пароль"
						/>
						{ParseError(errors.confirmationPassword)}
					</div>

					<div className="form__item form__item_checkbox">
						<Checkbox
							checked={privacyPolicy}
							onChange={e => this.setState({
								privacyPolicy: e.target.checked
							})}>
							Настоящим подтверждаю, что я ознакомлен и согласен с условиями политики конфиденциальности. Узнать больше
						</Checkbox>
						<Checkbox
							checked={data.subNews}
							name="subNews"
							onChange={(e) => this.onChange(e, 'checked')}>
							На указанную электронную почту будут приходить наши новости, акции
						</Checkbox>
					</div>

					<div className="form__item form__buttons">
						<Button raised>Зарегистрироваться</Button>
					</div>
				</form>
			</Loader>
		)
	}
}

export default SignupForm