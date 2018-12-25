import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@rmwc/checkbox';
import TaskAdding from '../messages/TaskAdding';
import SvgCog from '../../other/img/cog-solid';
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
		dialogOpen: PropTypes.func.isRequired,
		loadingNewTasks: PropTypes.func.isRequired,
		pageLoading: PropTypes.bool.isRequired
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
		const { tasks, successTask, dialogOpen, pageLoading } = this.props;
		const { loading } = this.state;
		return (
			<Loader opacity='0' loading={pageLoading}>
				{tasks.length === 0 ?
					<TaskAdding /> :
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
										<td className="td-perform">
											<Checkbox
												checked={task.success}
												onChange={() => {
													successTask(task._id);
												}}
											/>
											
											<span 
												className="svg-cog"
												onClick={() => dialogOpen('edit', i)}
											>
												<SvgCog 
													width='16' 
													height='16'
													alt="Изменение задачи"
												/>
											</span>
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
			</Loader>
		)
	}
}

export default TableTasks 
