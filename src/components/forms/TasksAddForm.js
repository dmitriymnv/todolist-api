import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../loader';
import './css/main';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';
import { Button } from '@rmwc/button';

export class TasksAddForm extends Component {
	static propTypes = {
		submit: PropTypes.func.isRequired,
	}

	state = {
		data: {
			title: '',
			color: ''
		},
		loading: false
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
		const { data, loading } = this.state;
		return (
			<Loader loading={loading}>
				<form className="inline-form" onSubmit={this.onSubmit}>
					<Typography use="headline5" className="headline-form">Добавление задачи</Typography>
					
					<TextField
						value={data.title}
						onChange={this.onChange}
						type="text"
						name="title"
						label="Задача"
						rows="3"
						required
						textarea 
						fullwidth 
					/>

					<Select
						value={data.color}
						onChange={this.onChange}
						label="Цвет задачи"
						name="color"
						options={[
							{
								label: '',
								value: ''
							},
							{
								label: 'Жёлтый',
								value: 'yellow'
							},
							{
								label: 'Синий',
								value: 'blue',
							},
							{
								label: 'Красный',
								value: 'red'
							}
						]}
					/>

					<Button raised>Добавить</Button>
				</form>
			</Loader>
		)
	}
}

export default TasksAddForm
