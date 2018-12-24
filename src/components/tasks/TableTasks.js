import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@rmwc/checkbox';
import TaskAdding from '../messages/TaskAdding';
import Loader from '../loader';

const options = {
	year: '2-digit',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit'
}

class TableTasks extends Component {
	static propTypes = {
		tasks: PropTypes.array.isRequired,
		successTask: PropTypes.func.isRequired,
		dialogAddTaskOpen: PropTypes.func.isRequired,
		loadingNewTasks: PropTypes.func.isRequired,
	}

	state = {
		loading: false,
		loaded: false
	}

	onScrollList = (e) => {
		const { scrollTop, offsetHeight, scrollHeight } = e.target;
		const { loading, loaded } = this.state
		const isCilentAtBottom = 200 + scrollTop + 
			offsetHeight >= scrollHeight;

		if(isCilentAtBottom && !loading && !loaded) {
			this.setState({ loading: true });
			this.props.loadingNewTasks()
				.then((res) => {
					this.setState({ loading: false, loaded: res })
				})
		}
  }

	render() {
		const { tasks, successTask, dialogAddTaskOpen } = this.props;
		const { loading } = this.state;
		return (
			<>
				{tasks.length === 0 ?
					<TaskAdding dialogAddTaskOpen={dialogAddTaskOpen} /> :
					<table className="task-tables">
						<thead>
							<tr>
								<th>Выполнение</th>
								<th className="task-tables__title">Задача</th>
								<th>Дата создания</th>
								<th>Дата выполнения</th>
							</tr>
						</thead>
						<tbody onScroll={e => this.onScrollList(e)}>
							{tasks.map((task, i) => {
								return (
									<tr
										key={i}
										className={`${task.success? 'success ' : ''}${task.color}`}
									>
										<td>
											<Checkbox
												checked={task.success}
												onChange={() => {
													successTask(task._id);
												}}
											/>
										</td>
										<td className="task-tables__title">{task.title}</td>
										<td>
											{new Date(task.dateCreate).toLocaleString('ru', options)}
										</td>
										<td>
											{task.dateCompletion ? 
												new Date(task.dateCompletion).toLocaleString('ru', options) : '-'
											}
										</td>
									</tr>
								)
							})}
							{loading &&
								<tr className="tr-loader">
									<td><Loader loading size={35} /></td>
								</tr>
							}
						</tbody>
					</table>
				}
			</>
		)
	}
}

export default TableTasks 
