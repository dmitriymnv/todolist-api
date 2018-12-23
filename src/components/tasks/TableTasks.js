import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableBody,
  DataTableHeadCell,
  DataTableRow,
  DataTableCell
} from '@rmwc/data-table';
import { Checkbox } from '@rmwc/checkbox';
import TaskAdding from '../messages/TaskAdding';

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
		dialogAddTaskOpen: PropTypes.func.isRequired,
		loadingNewTasks: PropTypes.func.isRequired,
	}

	state = {
		loadingNewTasks: false,
	}

	onScrollList = (e) => {
		const { scrollTop, offsetHeight, scrollHeight } = e.target;
		
		const isCilentAtBottom = 30 +  scrollTop + 
		offsetHeight == scrollHeight;

    if (isCilentAtBottom) {
			this.setState({ loadingNewTasks: true })
			this.props.loadingNewTasks()
				.then(() => this.setState({ loadingNewTasks: false}))
    }
  }

	render() {
		const { tasks, successTask, dialogAddTaskOpen } = this.props;
		return (
			<DataTable className="task-tables" onScroll={e => this.onScrollList(e)}>
			{tasks.length === 0 ?
				<TaskAdding dialogAddTaskOpen={dialogAddTaskOpen} /> :
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
							return (
								<DataTableRow
									key={i}
									selected={!!task.success}
									className={`task-tables__row ${task.color}`}
								>
									<DataTableCell className="checkbox-task">
										<Checkbox
											checked={task.success}
											onChange={() => {
												successTask(task._id);
											}}
										/>
									</DataTableCell>
									<DataTableCell className="task-tables__title">{task.title}</DataTableCell>
									<DataTableCell>
										{new Date(task.dateCreate).toLocaleString('ru', options)}</DataTableCell>
									<DataTableCell>
										{task.dateCompletion ? 
											new Date(task.dateCompletion).toLocaleString('ru', options): '-'
										}
								</DataTableCell>
								</DataTableRow>
							)}
						)}
					</DataTableBody>
				</DataTableContent>
				}
		</DataTable>
		)
	}
}

export default TableTasks 
