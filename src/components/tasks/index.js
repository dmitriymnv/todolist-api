import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadingTasks, addTask, successTask } from '../../ac/tasks';
import './css/main';
import { Dialog, DialogContent } from '@rmwc/dialog';
import TasksAddForm from '../forms/TasksAddForm';
import Loader from '../loader';
import { Fab } from '@rmwc/fab';
import SVGplus from '../../other/img/plus.svg';
import TableTasks from './TableTasks';

export class index extends Component {
	static propTypes = {
		loadingTasks: PropTypes.func.isRequired,
		addTask: PropTypes.func.isRequired,
		successTask: PropTypes.func.isRequired,
	}

	state = {
		tasks: [],
		dialogAddTaskOpen: false,
		total: 0,
		loading: true
	}

	componentDidMount() {
		this.props.loadingTasks(0)
			.then(res => {
				this.setState({ tasks: res.tasks, total: res.total, loading: false })
			})
	}

	success = (id) => {
		const task = this.state.tasks.find((task) => task._id == id);
		const completion = task.dateCompletion ? '': new Date();		
		this.setState({ ...this.state.tasks [
			task.success = !task.success,
			task.dateCompletion = completion ]
		 });
		this.props.successTask(id)
	}

	dialogAddTaskOpen = () => {
		this.setState({ dialogAddTaskOpen: true });
	}

	onSubmit = (data) => {
		this.setState({ loading: true });
		return (
			this.props.addTask(data)
			.then(({ task }) => 
				this.setState({ 
					tasks: [task, ...this.state.tasks], 
					dialogAddTaskOpen: false, 
					loading: false 
				})
			)
		)
	}

	render() {
		const { tasks, loading } = this.state;
		const date = new Date();
		return (
			<Loader className="flex-container" loading={loading}>
				<span className="task-title">
					{`${date.toLocaleString('ru', {weekday: 'long'})} , ${date.getDate()}`}

					<Fab
						onClick={() => this.setState({ dialogAddTaskOpen: true })}
						icon={
							<SVGplus width="30" height="30" />
						} 
					/>	

				</span>

				<TableTasks 
					tasks={tasks}
					successTask={this.success}
					dialogAddTaskOpen={this.dialogAddTaskOpen}
				/>

				<Dialog
					open={this.state.dialogAddTaskOpen}
					onClose={() => this.setState({ dialogAddTaskOpen: false })}
				>   
					<DialogContent><TasksAddForm submit={this.onSubmit} /></DialogContent>
				</Dialog>

			</Loader>
		)
	}
}

export default connect(null, { loadingTasks, addTask, successTask })(index)
