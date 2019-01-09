import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './css/main';
import { 
	loadingTasks, 
	addTask, 
	successTask, 
	editTask
	} from '../../ac/tasks';
import { loadingMemberFamily } from '../../ac/family';
import TableTasks from './table/TableTasks';
import TaskTitle from './TaskTitle';
import TaskDialog from './TaskDialog';

export class Tasks extends Component {
	static propTypes = {
		loadingTasks: PropTypes.func.isRequired,
		addTask: PropTypes.func.isRequired,
		successTask: PropTypes.func.isRequired,
		editTask: PropTypes.func.isRequired,
		loadingMemberFamily: PropTypes.func.isRequired,
	}

	state = {
		tasks: { 0: [], 1: [] },
		tags: [],
		activeTab: 0,
		dialog: {
			open: false,
			purpose: undefined,
			data: []
		},
		total: 0,
		loaded: 0,
		loading: true
	}

	componentDidMount() {
		const { loaded, activeTab } = this.state;
		const { loadingMemberFamily } = this.props;
		loadingMemberFamily();
		this.loadingTasks(loaded, activeTab, true);
	}

	successTask = (id) => {
		const { tasks, activeTab } = this.state;
		const newTasks = tasks[activeTab].map((task) => {
			if(task._id == id) {
				task.success = !task.success;
				task.dateCompletion ? null : new Date();
			}
			return task
		})
		
		this.setState({ 
			tasks: { 
				...tasks, [activeTab]: [ ...newTasks ]
			}
		 });

		this.props.successTask({ id, activeTab })
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

	onSubmit = (task, purpose) => {
		const { tasks, tags, activeTab, total, loaded } = this.state;
		this.setState({
			loading: true,
			dialog: { open: false },
			tags: 
				tags.indexOf(task.tag) == -1 ? 
					[task.tag, ...tags] : tags
		});
		
		switch (purpose) {
			case 'add':
				this.props.addTask({ task, activeTab })
					.then(({ task }) => {
						this.setState({
							tasks: { 
								...tasks, [activeTab]: [ task, ...tasks[activeTab] ]
							},
							total: total + 1,
							loaded: loaded + 1,
							loading: false
						})
					})
				break;

			case 'edit':
				this.props.editTask({ task, activeTab })
					.then(({ i }) => {
						const findTask = this.state.tasks[i];
						this.setState({
							...this.state.tasks [
								findTask.title = task.title,
								findTask.tag = task.tag,
								findTask.color = task.color
							],
							loading: false
						});
					})
		
			default:
				break;
		}
	}

	loadingTasks = (loaded, activeTab, loadingTags = undefined, ajax = false) => {
		const { tasks, total } = this.state;

		return (
			this.props.loadingTasks({ loaded, activeTab, loadingTags })
				.then(({ tasks: newTasks, ...rest }) => {

					if(ajax) {

						this.setState({
							tasks: { 
								...tasks, [activeTab]: [ ...tasks[activeTab], ...newTasks ]
							},
							loaded: loaded + rest.loaded,
							loading: false 
						})

						return loaded == total ? false : true;
					} else {
						this.setState({
							tasks: { 
								...tasks, [activeTab]: newTasks
							},
							...rest,
							loading: false 
						})
						
					}
				})
		)

	}

	onActivateTab = (num) => {
		this.setState({ 
			activeTab: num, 
			loading: true
		});

		if(Object.keys(this.state.tasks[num]).length == 0) {
			this.loadingTasks(0, num); 
		} else {
			this.setState({ loading: false });
		}
	}

	render() {
		const { 
			tasks,
			loaded,
			tags, 
			dialog, 
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
					onActivateTab={this.onActivateTab}
					successTask={this.successTask}
					dialogOpen={this.dialogOpen}
					loading={loading}
					onScrollList={() => this.loadingTasks(loaded, activeTab, false, true)}
				/>

				<TaskDialog 
					dialog={dialog}
					tags={tags}
					onSubmit={this.onSubmit}
					onClose={ () => this.setState({ dialog: { open: false }}) }
				/>
			</div>
		)
	}
}

export default connect(null, {
	 loadingTasks, addTask, successTask, 
	 editTask, loadingMemberFamily
})(Tasks)
