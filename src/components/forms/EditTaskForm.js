import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';
import { Button } from '@rmwc/button';

import Loader from '../loader';
import './css/main';
import ParseError from '../utils/ParseError';

export class EditTaskForm extends Component {
	static propTypes = {
		submit: PropTypes.func.isRequired,
		task: PropTypes.shape({
			title: PropTypes.string.isRequired,
			color: PropTypes.string.isRequired,
			tag: PropTypes.string,
			_id: PropTypes.string.isRequired
		}).isRequired
	}

	state = {
		data: {
			title: this.props.task.title,
			color: this.props.task.color,
			tag: this.props.task.tag,
			id: this.props.task._id
		},
		tags: this.props.tags,
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
		this.props.submit(this.state.data, 'edit')
	}

	render() {
		const { data, loading, tags, errors } = this.state;
		return (
			<Loader loading={loading}>
				<form className="form" onSubmit={this.onSubmit}>
					<Typography use="headline5" className="form__heading">
						Изменение задачи
					</Typography>

					<div className="form__item">
						<TextField
							value={data.title}
							onChange={this.onChange}
							className="form__textarea"
							type="text"
							name="title"
							label="Задача"
							rows="3"
							required
							textarea 
							fullwidth 
						/>
					</div>

					<div className="form__item">
						<TextField
							value={data.tag}
							onChange={this.onChange}
							list="character"
							name="tag"
							label="Тег"
							fullwidth 
						/>
						<datalist id="character">
							{tags.map((tag, i) => {
								return (
									<option 
										key={i}
										value={tag} 
									/>
								)
							})}
						</datalist>
					</div>

					<div className="form__item">
						<Select
							value={data.color}
							onChange={this.onChange}
							className="form__select"
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
					</div>

					<div className="form__item form__buttons">
						<Button raised>Изменить</Button>
					</div>

				</form>
			</Loader>
		)
	}
}

export default EditTaskForm
