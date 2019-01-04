import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dialog, DialogContent } from '@rmwc/dialog';

import './css/main';
import { 
	loadingTasks, 
	addTask, 
	successTask, 
	editTask
	} from '../../ac/tasks';
import TableTasks from './table/TableTasks';
import TaskTitle from './TaskTitle';
const AddTaskForm = lazy(() => import('../forms/AddTaskForm'));
const EditTaskForm = lazy(() => import('../forms/EditTaskForm'));

export class Tasks extends Component {
	static propTypes = {
		loadingTasks: PropTypes.func.isRequired,
		addTask: PropTypes.func.isRequired,
		successTask: PropTypes.func.isRequired,
		editTask: PropTypes.func.isRequired,
	}

	state = {
		tasks: { 0: [ {title: 'test'} ]},
		tags: [],
		activeTab: 0,
		dialog: {
			open: false,
			purpose: undefined,
			data: []
		},
		total: 0,
		loaded: 0,
		loading: false
	}

	componentDidMount() {
		const { loaded, activeTab } = this.state;
		this.props.loadingTasks({ loaded, activeTab, loadingTags: true })
			.then(({ tasks, ...rest }) => {
				this.setState({
					tasks: { ...this.state.tasks, [activeTab]: tasks},
					...rest,
					loading: false 
				})
			})
	}

	successTask = (id, tabs, i) => {	
		// const task = this.state.tasks[i];
		// const completion = task.dateCompletion ? null : new Date();		
		// this.setState({ ...this.state.tasks [
		// 	task.success = !task.success,
		// 	task.dateCompletion = completion ]
		//  });
		// this.props.successTask(id)
	}

	dialogOpen = (purpose, i) => {

		this.setState({ 
			dialog: {
				open: true,
				purpose,
				numberTask: i
			}
		});
	}

	onSubmit = (data, purpose) => {
		const { tags } = this.state;
		this.setState({
			loading: true,
			dialog: { open: false },
			tags: 
				tags.indexOf(data.tag) == -1 ? 
					[data.tag, ...tags] : tags
		});
		
		switch (purpose) {
			case 'add':
				this.props.addTask(data)
					.then(({ task }) => {
						this.setState({
							tasks: [task, ...this.state.tasks],
							total: this.state.total + 1,
							loaded: this.state.loaded + 1,
							loading: false
						})
					})
				break;

			case 'edit':
				this.props.editTask(data)
					.then(({ i }) => {
						const task = this.state.tasks[i];
						this.setState({
							...this.state.tasks [
								task.title = data.title,
								task.tag = data.tag,
								task.color = data.color
							],
							loading: false
						});
					})
		
			default:
				break;
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
		const { 
			tasks, 
			tags, 
			dialog: { numberTask, open, purpose }, 
			loading, 
			activeTab 
		} = this.state;
		return (
			<div className="flex-container">
				<TaskTitle 
					addTask={() => this.setState({ dialog: { open: true, purpose: 'add' } })}
				/>

				<TableTasks 
					tasks={tasks}
					activeTab={activeTab}
					onActivateTab={(num) => this.setState({ activeTab: num })}
					successTask={this.successTask}
					dialogOpen={this.dialogOpen}
					pageLoading={loading}
					loadingNewTasks={this.loadingNewTasks}
				/>

				<Dialog
					open={open}
					onClose={() => 
						this.setState({ dialog: { open: false } })
					}
				>  
					{purpose &&
						<DialogContent>
							{purpose == 'add' ? 
								<AddTaskForm 
									submit={this.onSubmit} 
									tags={tags}
								/> :
								<EditTaskForm
									task={ tasks[activeTab][numberTask] }
									tags={tags}
									submit={this.onSubmit} 
								/>
							}
						</DialogContent>
					}
				</Dialog>
			</div>
		)
	}
}

export default connect(null, {
	 loadingTasks, addTask, successTask, editTask
})(Tasks)
