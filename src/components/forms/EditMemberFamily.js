import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import { ListDivider } from '@rmwc/list';

import './css/main';
import Loader from '../loader';
import ParseError from '../utils/ParseError';

export class AddTaskForm extends Component {
	static propTypes = {
		// dialogOpen: PropTypes.bool.isRequired,
		// submit: PropTypes.func.isRequired
	}

	state = {
		data: {
			list: ''
		},
		loading: false,
		errors: { }
	}

	onChange = e => {
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		})
	}

	onSubmit = (e) => {
		e.preventDefault();
		this.setState({ loading: true });

		const splitList = this.state.data.list.split(' ');
		const errors = this.validate(splitList);

		if(Object.keys(errors).length === 0) {
			this.props.submit(splitList)
				.catch(errors => this.setState({ errors, loading: false }));
		} else {
			this.setState({ errors, loading: false })
		}
	}

	validate = (data) => {
		let errors = {};

		for (let index = 0; index < data.length; index++) {
			if(data[index].length < 5) {
				errors.global = "Имя пользователя должно содержать не менее пяти знаков";
				break;
			}
		}
		
		return errors;
	}

	render() {
		const { data, loading, errors } = this.state;
		return (
			<Loader loading={loading}>
				<form className="form" onSubmit={this.onSubmit}>
					<Typography use="headline5" tag="h1" className="form__heading">Добавление пользователей в группу</Typography>

					{
						typeof errors.global == 'object' ?
							errors.global.map((error, i) => {
								return (
									ParseError(error, i)
								)
							}) :
							ParseError(errors.global)
					}

					<div className="form__item">
						<Typography
							className="form__item__title"
							use="subtitle2"
							tag="div"
						>
							Введите имена пользователей(ник-нейм) через пробел, которых вы хотите добавить в группу
						</Typography>

						<ListDivider className="form__item__hr" />

						<TextField
							value={data.list}
							onChange={this.onChange}
							name="list"
							label="Имена пользователей"
							fullwidth 
						/>
					</div>

					<div className="form__item form__buttons">
						<Button raised>Добавить</Button>
					</div>

				</form>
			</Loader>
		)
	}
}

export default AddTaskForm
