import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@rmwc/checkbox';

import SvgCog from '../../../other/img/cog-solid';

const TableTrPrivate = ({ task, options, successTask, dialogOpen }) => {
	return (
		<tr
			className={`${task.success? 'success ' : ''}${task.color}`}
		>
			<td className="task-table__task-checkbox">
				<Checkbox
					checked={task.success}
					onChange={successTask}
				/>
				
				<span 
					className="svg-cog"
					onClick={dialogOpen}
				>
					<SvgCog 
						width="16"
						height="16"
					/>
				</span>
			</td>
			<td className="task-table__task-name">
				<div>{task.title}</div>
				{task.tag && <span className="task-table__task-tag">Тег: {task.tag}</span>}
			</td>
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
}

TableTrPrivate.propTypes = {
	task: PropTypes.shape({
		title: PropTypes.string.isRequired,
		success: PropTypes.bool.isRequired,
		_id: PropTypes.string.isRequired,
		dateCreate: PropTypes.string.isRequired,
		dateCompletion: PropTypes.String,
		color: PropTypes.string,
		tag: PropTypes.string,
	}).isRequired,
	options: PropTypes.object.isRequired,
	successTask: PropTypes.func.isRequired,
	dialogOpen: PropTypes.func.isRequired,
}

export default TableTrPrivate
