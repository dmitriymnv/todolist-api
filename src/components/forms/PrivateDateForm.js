import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import { ListDivider } from '@rmwc/list';

import './css/main';
import Loader from '../loader';
import ParseError from '../utils/ParseError';

export class PrivateDateForm extends Component {
	static propTypes = {
		submit: PropTypes.func.isRequired,
	}

	state = {
		data: {
			email: '',
			username: ''
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
		const username = data.username;

		if(username.length == 0 && data.email.length == 0) {
			errors.global = "Вы не заполнили не одно поле";
			return errors;
		}

		if(
			username.length > 0 && username.length < 5 || username.match(/\s/)
			) {
			errors.username = "Имя пользователя должно не содержать пробелов и бытне менее пяти знаков";
			return errors;
		}

		return errors;
	}

	render() {
		const { data, loading, errors } = this.state;
		return (
			<Loader loading={loading}>
				<form onSubmit={this.onSubmit}
				 className="form form__single form__private"
				>
					<Typography
						use="headline5" 
						tag="h1" 
						className="form__heading"
					>
						Изменение личных данных
					</Typography>

					{ParseError(errors.global)}

					<div className="form__item">
						<ListDivider />
						<Typography 
							use="subtitle1" 
							tag="div" 
							className="form__heading form__private__heading"
						>
							Изменение E-mail
						</Typography>
						{ParseError(errors.email)}

						<TextField
							value={data.email}
							onChange={this.onChange}
							className="form__field"
							type="email"
							name="email"
							label="Ваш новый E-mail"
						/>
					</div>

					

					<div className="form__item">
						<ListDivider />
						<Typography 
							use="subtitle1" 
							tag="div" 
							className="form__heading form__private__heading"
						>
							Изменение имя пользователя
						</Typography>
						{ParseError(errors.username)}

						<TextField
							value={data.username}
							onChange={this.onChange}
							className="form__field"
							type="text"
							name="username" 
							label="Ваше новое имя пользователя"
						/>
					</div>


					<div className="form__item form__buttons">
						<Button raised>Изменить</Button>
					</div>
				</form>
			</Loader>
		)
	}
}

export default PrivateDateForm