import React from 'react';
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

const BodyTasks = ({ tasks, successTask, dialogAddTaskOpen }) => {
	const options = {
		year: '2-digit',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	};
	return (
		<DataTable className="task-tables">
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
											onChange={evt => {
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

BodyTasks.propTypes = {
	tasks: PropTypes.array.isRequired,
	dialogAddTaskOpen: PropTypes.func.isRequired
}

export default BodyTasks
