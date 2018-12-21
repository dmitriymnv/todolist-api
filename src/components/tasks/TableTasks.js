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

const BodyTasks = ({ tasks, dialogAddTaskOpen }) => {
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
										date.toLocaleString('ru', options)
									}</DataTableCell>
									<DataTableCell>{task.dateCompletion}</DataTableCell>
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
