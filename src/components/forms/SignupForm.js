import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/signup.sass';
import SvgEyeOpen from '../../other/img/eye-solid.svg';
import SvgEyeClose from '../../other/img/eye-slash-solid.svg';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import { Icon } from '@rmwc/icon';

export class SignupForm extends Component {
	static propTypes = {

	}

	state = {
		data: {
			email: '',
			username: '',
			password: '',
			confirmationPassword: ''
		},
		showPassword: false
	}

	onChange = e => {
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		})
	}

	render() {
		const { data, showPassword } = this.state;
		return (
			<form className="signup-form">
				<header>
					<Typography use="headline5">Регистрация</Typography>
				</header>

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
						withTrailingIcon={
							<Icon 
								onClick={() => this.setState({ showPassword: !this.state.showPassword})} 
								icon={showPassword ?
									<SvgEyeClose width={18} height={18} /> : <SvgEyeOpen width={18} height={18}  />
								} 
							/>
						}
						type="password" 
						name="password"
						label="Пароль"
					/>
					<TextField
						value={data.confirmationPassword}
						onChange={this.onChange}
						className="signup-form__field"
						required
						type="password"
						name="confirmationPassword" 
						label="Повторите пароль"
					/>
				</div>

				<div className="signup-form__item signup-form__button">
					<Button>Войти</Button>
					<Button raised>Зарегистрироваться</Button>
				</div>
			</form>
		)
	}
}

export default SignupForm