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
import TableTasks from './table/TableTasks';
import TaskTitle from './TaskTitle';
import TaskDialog from './TaskDialog';

export class Tasks extends Component {
	static propTypes = {
		loadingTasks: PropTypes.func.isRequired,
		addTask: PropTypes.func.isRequired,
		successTask: PropTypes.func.isRequired,
		editTask: PropTypes.func.isRequired,
		username: PropTypes.string.isRequired,
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
		this.loadingTasks(loaded, activeTab, true);
	}

	successTask = (id) => {
		const { tasks, activeTab } = this.state;
		const newTasks = tasks[activeTab].map(task => {
			if(task._id == id) {
				task.success = !task.success;
				task.dateCompletion = task.dateCompletion ? undefined : new Date();
				if(activeTab == 1) {
					task.successAuthor = task.successAuthor ? undefined : this.props.username
				};
			}
			return task;
		});

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
		const { addTask, editTask, username } = this.props;
		
		this.setState({ loading: true });
		
		switch (purpose) {
			case 'add':
				addTask({ task, activeTab })
					.then(({ task }) => {
						this.setState({
							tasks: { 
								...tasks, [activeTab]: [ task, ...tasks[activeTab] ]
							},
							total: total + 1,
							loaded: loaded + 1
						})
					})
					
				break;

			case 'edit':	
				editTask({ task, activeTab });

				const newTasks = tasks[activeTab].map((iterativeTask) => {
					if(iterativeTask._id == task.id) {
						iterativeTask.title = task.title,
						iterativeTask.tag = task.tag,
						iterativeTask.color = task.color;
						if(activeTab == 1) iterativeTask.editAuthor = username
					}
					return iterativeTask;
				});

				this.setState({ 
					tasks: { 
						...tasks, [activeTab]: [ ...newTasks ]
					}
				});

				break;
				
			default:
				break;

		}

		this.setState({ 
			loading: false,
			dialog: { open: false },
			tags: 
				tags.indexOf(task.tag) == -1 ? 
					[task.tag, ...tags] : tags
		})
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

		this.loadingTasks(0, num);
	}

	render() {
		const { 
			tasks, loaded, tags, 
			dialog, loading, activeTab 
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
					task={
						dialog.purpose == 'edit' ?
						tasks[activeTab][dialog.numberTask] : 
						undefined
					}
					dialog={dialog}
					tags={tags}
					onSubmit={this.onSubmit}
					onClose={() => this.setState({ dialog: { open: false }})}
				/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		username: state.user.username
	}
}

export default connect(mapStateToProps, {
	 loadingTasks, addTask, successTask, 
	 editTask
})(Tasks)
