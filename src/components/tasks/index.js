import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tasks, addTask } from '../../ac/tasks';
import api from '../../ac/api';
const DataTable  = lazy(() => import('@rmwc/data-table').then(e => ({ default: e.DataTable })) );
const DataTableContent  = lazy(() => import('@rmwc/data-table').then(e => ({ default: e.DataTableContent })) );
const DataTableBody  = lazy(() => import('@rmwc/data-table').then(e => ({ default: e.DataTableBody })) );
const DataTableHeadCell  = lazy(() => import('@rmwc/data-table').then(e => ({ default: e.DataTableHeadCell })) );
const DataTableHead  = lazy(() => import('@rmwc/data-table').then(e => ({ default: e.DataTableHead })) );
const DataTableRow  = lazy(() => import('@rmwc/data-table').then(e => ({ default: e.DataTableRow })) );
const DataTableCell  = lazy(() => import('@rmwc/data-table').then(e => ({ default: e.DataTableCell })) );
const Checkbox  = lazy(() => import('@rmwc/checkbox').then(e => ({ default: e.Checkbox })) );
import './css/main';

export class index extends Component {
	static propTypes = {
		tasks: PropTypes.func.isRequired,
		addTask: PropTypes.func.isRequired,
	}

	state = {
		tasks: [],
		loading: false
	}

	componentDidMount() {
		this.props.tasks(0);
	}

	onSuccess = (i) => {
		this.setState({ ...this.state.tasks, ...this.state.tasks[i].success = !this.state.tasks[i].success })
	}

	// addTask = (data) => {
	// 	this.props.addTask({ title: 'Тестовая запись', color: 'yellow' });
	// }

	render() {
		const { tasks, loading } = this.state;
		const date = new Date();
		return (
			<>
				<span className="task-title">
					{`${date.toLocaleString('ru', {weekday: 'long'})} , ${date.getDate()}`}
				</span>
				<DataTable className="task-tables">
					{tasks.length === 0?
						<div className="task-tables-zero">Добавьте свою первую задачу прямо сейчас!</div>:
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
									{tasks.map((task, i) => (
										<DataTableRow
											key={i}
											selected={task.success}
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
											<DataTableCell>{task.dataCreate}</DataTableCell>
											<DataTableCell>{task.dataCompletion}</DataTableCell>
										</DataTableRow>
									))}
								</DataTableBody>
						</DataTableContent>
					 }
				</DataTable>
			</>
		)
	}
}

export default connect(null, { tasks, addTask })(index)
