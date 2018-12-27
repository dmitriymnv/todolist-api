import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/main';
import Loader from '../loader';
import ParseError from '../utils/ParseError';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import { ListDivider } from '@rmwc/list';

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

		if(data.username.length == 0 && data.email.length == 0) {
			errors.global = "Вы не заполнили не одно поле";
			return errors;
		}

		if(data.username.length < 5 || data.username.match(/\s/)) {
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
				 className="default-form full-form private-date-form"
				>
					<Typography
						use="headline5" 
						tag="h1" 
						className="headline-form"
					>
						Изменение личных данных
					</Typography>

					{ParseError(errors.global)}

					<ListDivider />
					<Typography 
						use="headline6" 
						tag="div" 
						className="headline-form"
					>
						Изменение E-mail
					</Typography>

					<div className="default-form__item">
						<TextField
							value={data.email}
							onChange={this.onChange}
							className="default-form__field"
							type="email"
							name="email"
							label="Ваш новый E-mail"
						/>
					</div>

					<ListDivider />
					<Typography 
						use="headline6" 
						tag="div" 
						className="headline-form"
					>
						Изменение имя пользователя
					</Typography>

					<div className="default-form__item">
						<TextField
							value={data.username}
							onChange={this.onChange}
							className="default-form__field"
							type="text"
							name="username" 
							label="Ваше новое имя пользователя"
						/>
						{ParseError(errors.username)}
					</div>

					<div className="default-form__item default-form__button">
						<Button raised>Изменить</Button>
					</div>
				</form>
			</Loader>
		)
	}
}

export default PrivateDateForm