import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../../loader';
import TableTr from './TableTr';

const options = {
	year: '2-digit',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit'
}

const TableBody = ({ 
	onScrollList, tasks, successTask, dialogOpen, loading, activeTab
	}) => {
	return (
		<tbody className="task-table__body" onScroll={e => onScrollList(e)}>
			{tasks[activeTab].map((task, i) => {
				return (
					<TableTr 
						task={task}
						key={i}
						successTask={() => successTask(task._id, i)}
						dialogOpen={() => dialogOpen('edit', i)}
						options={options}
					/>
				)
			})}
			{loading &&
				<tr className="task-table__live-loading">
					<td><Loader loading size={35} /></td>
				</tr>
			}
		</tbody>
	)
}

TableBody.propTypes = {
	onScrollList: PropTypes.func.isRequired,
	tasks: PropTypes.object.isRequired,
	dialogOpen: PropTypes.func.isRequired,
	successTask: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	activeTab: PropTypes.number.isRequired,
}

export default TableBody
