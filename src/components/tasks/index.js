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
import { Select } from '@rmwc/select';
import { Checkbox } from '@rmwc/checkbox';
import { Switch } from '@rmwc/switch';
import './css/main'

export class index extends Component {
	static propTypes = {

	}

	state = {
		tasks: [
			{
				title: 'Первая задача',
				dataCreate: '12/01/2018',
				dataCompletion: '12/01/2018',
				color: 'blue',
				success: false
			},
			{
				title: 'Вторая задача',
				dataCreate: '12/01/2018',
				dataCompletion: '12/01/2018',
				color: 'red',
				success: true
			},
		],
		loading: false
	}

	onSuccess = (i) => {
		this.setState({ ...this.state.tasks, ...this.state.tasks[i].success = !this.state.tasks[i].success })
	}

	render() {
		const { tasks, loading } = this.state;
		return (
			<DataTable>
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
								selected={task.success}>
								<DataTableCell className="checkbox-task">
									<Checkbox
										checked={task.success}
										onChange={evt => {
											this.onSuccess(i);
										}}
									/>
								</DataTableCell>
								<DataTableCell>{task.title}</DataTableCell>
								<DataTableCell>{task.dataCreate}</DataTableCell>
								<DataTableCell>{task.dataCompletion}</DataTableCell>
							</DataTableRow>
						))}
					</DataTableBody>
				</DataTableContent>
			</DataTable>
		)
	}
}

export default index
