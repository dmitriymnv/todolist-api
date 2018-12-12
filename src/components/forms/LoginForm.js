import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/login.sass';
import Loader from '../loader';
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
			.catch(err => { this.setState({ errors: err.response.data.errors, loading: false }) });
	}

	render() {
		const { data, loading } = this.state;
		return (
			<Loader loading={loading}>
				<form onSubmit={this.onSubmit}>
					<TextField 
						value={data.email} 
						onChange={this.onChange}
						required={true}
						type="email"
						name="email" 
						label="Ваш E-Mail" 
					/>

					<TextField 
						value={data.password}
						onChange={this.onChange}
						required={true}
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
