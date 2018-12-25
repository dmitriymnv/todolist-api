import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadingTasks, addTask, successTask, editTask } from '../../ac/tasks';
import './css/main';
import { Dialog, DialogContent } from '@rmwc/dialog';
const AddTaskForm = lazy(() => import('../forms/AddTaskForm'));
const EditTaskForm = lazy(() => import('../forms/EditTaskForm'));
import { Fab } from '@rmwc/fab';
import SVGplus from '../../other/img/plus.svg';
import TableTasks from './TableTasks';

export class Tasks extends Component {
	static propTypes = {
		loadingTasks: PropTypes.func.isRequired,
		addTask: PropTypes.func.isRequired,
		successTask: PropTypes.func.isRequired,
		editTask: PropTypes.func.isRequired,
	}

	state = {
		tasks: [],
		dialog: {
			open: false,
			purpose: undefined
		},
		total: 0,
		loaded: 0,
		loading: true
	}

	componentDidMount() {
		this.props.loadingTasks(0)
			.then(res => {
				this.setState({ 
					tasks: res.tasks, 
					total: res.total, 
					loaded: 15, 
					loading: false })
			})
	}

	find = (id) => {
		return this.state.tasks.find((task) => task._id == id);
	}

	success = (id) => {
		const task = this.find(id);
		const completion = task.dateCompletion ? '' : new Date();		
		this.setState({ ...this.state.tasks [
			task.success = !task.success,
			task.dateCompletion = completion ]
		 });
		this.props.successTask(id)
	}

	dialogOpen = (purpose, number = undefined) => {
		this.setState({ 
			dialog: {
				open: true,
				purpose,
				data: number
			}
		});
	}

	onSubmit = (data, purpose) => {
		this.setState({ loading: true });
		if(purpose == 'add') {
			return (
				this.props.addTask(data)
					.then(({ task }) => 
						this.setState({ 
							tasks: [task, ...this.state.tasks],
							dialog: { open: false, purpose: undefined },
							total: this.state.total + 1,
							loaded: this.state.loaded + 1,
							loading: false 
						})
				)
			)
		} else if(purpose == 'edit') {
			const task = this.find(data.id);	
			this.setState({ 
				...this.state.tasks [
					task.title = data.title,
					task.color = data.color
				],
				dialog: { open: false, purpose: undefined },
				loading: false
			});
			return (
				this.props.editTask(data)
			)
		}
	}

	loadingNewTasks = () => {
		return new Promise((resolve, reject) => {
			const { total, loaded } = this.state;
			if(total > loaded) {
				this.props.loadingTasks(this.state.loaded)
					.then((res) => {
						this.setState({
							tasks: [...this.state.tasks, ...res.tasks],
							loaded: this.state.loaded + res.value
						})
						return resolve(false)
					})
			}	else {
				return resolve(true)
			}
		})
	}

	render() {
		const { tasks, dialog, loading } = this.state;
		const date = new Date();
		return (
			<div className="flex-container">
				<span className="task-title">
					{`${date.toLocaleString('ru', {weekday: 'long'})} , ${date.getDate()}`}

					<Fab
						onClick={() => this.setState({ dialog: { open: true, purpose: 'add' } })}
						icon={
							<SVGplus width="30" height="30" />
						} 
					/>	

				</span>

				<TableTasks 
					tasks={tasks}
					successTask={this.success}
					dialogOpen={this.dialogOpen}
					pageLoading={loading}
					loadingNewTasks={this.loadingNewTasks}
				/>

				<Dialog
					open={dialog.open}
					onClose={() => 
						this.setState({ dialog: { open: false, purpose: undefined } })
					}
				>   
					<DialogContent>
						{dialog.purpose == 'add' && <AddTaskForm submit={this.onSubmit} />}
						{dialog.purpose == 'edit' && 
							<EditTaskForm
								task={tasks[dialog.data]}
								submit={this.onSubmit} 
							/>
						}
					</DialogContent>
				</Dialog>
			</div>
		)
	}
}

export default connect(null, {
	 loadingTasks, addTask, successTask, editTask 
})(Tasks)
