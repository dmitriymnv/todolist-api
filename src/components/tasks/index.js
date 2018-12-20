import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadingTasks, addTask } from '../../ac/tasks';
import api from '../../ac/api';
import './css/main';
import { Dialog, DialogContent } from '@rmwc/dialog';
import TasksAddForm from '../forms/TasksAddForm';
import Loader from '../loader';
import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableBody,
  DataTableHeadCell,
  DataTableRow,
  DataTableCell
} from '@rmwc/data-table';
// const DataTable  = lazy(() => import('@rmwc/data-table').then(e => ({ default: e.DataTable })) );
// const DataTableContent  = lazy(() => import('@rmwc/data-table').then(e => ({ default: e.DataTableContent })) );
// const DataTableBody  = lazy(() => import('@rmwc/data-table').then(e => ({ default: e.DataTableBody })) );
// const DataTableHeadCell  = lazy(() => import('@rmwc/data-table').then(e => ({ default: e.DataTableHeadCell })) );
// const DataTableHead  = lazy(() => import('@rmwc/data-table').then(e => ({ default: e.DataTableHead })) );
// const DataTableRow  = lazy(() => import('@rmwc/data-table').then(e => ({ default: e.DataTableRow })) );
// const DataTableCell  = lazy(() => import('@rmwc/data-table').then(e => ({ default: e.DataTableCell })) );
const Checkbox  = lazy(() => import('@rmwc/checkbox').then(e => ({ default: e.Checkbox })) );
const TaskAdding = lazy(() => import('../messages/TaskAdding'));

export class index extends Component {
	static propTypes = {
		loadingTasks: PropTypes.func.isRequired,
		addTask: PropTypes.func.isRequired,
	}

	state = {
		tasks: [],
		dialogAddTaskOpen: false,
		loading: false
	}

	componentDidMount() {
		this.props.loadingTasks(0)
			.then(res => this.setState({ tasks: res.tasks, ...res.total }))
	}

	onSuccess = (i) => {
		this.setState({ ...this.state.tasks, ...this.state.tasks[i].success = !this.state.tasks[i].success })
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
					tasks: [...this.state.tasks, task], 
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
				</span>

				<DataTable className="task-tables">
					{tasks.length === 0 ?
						<TaskAdding dialogAddTaskOpen={this.dialogAddTaskOpen} /> :
						<DataTableContent>
							<DataTableHead >
								<DataTableRow>
									<DataTableHeadCell>Выполнение</DataTableHeadCell>
									<DataTableHeadCell>Задача</DataTableHeadCell>
									<DataTableHeadCell>Дата создания</DataTableHeadCell>
									<DataTableHeadCell>Дата выполнения</DataTableHeadCell>
								</DataTableRow>
							</DataTableHead>
								<DataTableBody>
									{tasks.map((task, i) => {
										const date = new Date(task.dateCreate);
										
										return (
											<DataTableRow
												key={i}
												selected={!!task.success}
												className={`task-tables__row ${task.color}`}
											>
												<DataTableCell className="checkbox-task">
													<Checkbox
														checked={task.success}
														onChange={evt => {
															this.onSuccess(i);
														}}
													/>
												</DataTableCell>
												<DataTableCell className="task-tables__title">{task.title}</DataTableCell>
												<DataTableCell>{
													date.toLocaleString('ru', {
														year: '2-digit',
														month: '2-digit',
														day: '2-digit',
														hour: '2-digit',
														minute: '2-digit'
													})
												}</DataTableCell>
												<DataTableCell>{task.dateCompletion}</DataTableCell>
											</DataTableRow>
										)}
									)}
								</DataTableBody>
						</DataTableContent>
					 }
				</DataTable>

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

export default connect(null, { loadingTasks, addTask })(index)
