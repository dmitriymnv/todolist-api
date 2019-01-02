import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@rmwc/checkbox';

import SvgCog from '../../other/img/cog-solid';
import Loader from '../loader';

const options = {
	year: '2-digit',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit'
}

const TableBody = ({ onScrollList, tasks, successTask, loading }) => {
	return (
		<tbody onScroll={e => onScrollList(e)}>
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
									successTask(task._id, i);
								}}
							/>
							
							<span 
								className="svg-cog"
								onClick={() => dialogOpen('edit', i)}
							>
								<SvgCog 
									width="16"
									height="16"
								/>
							</span>
						</td>
						<td className="task-tables__title">
							<div>{task.title}</div>
							{task.tag && <span className="tag">Тег: {task.tag}</span>}
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
			})}
			{loading &&
				<tr className="tr-loader">
					<td><Loader loading size={35} /></td>
				</tr>
			}
		</tbody>
	)
}

TableBody.propTypes = {
	onScrollList: PropTypes.func.isRequired,
	tasks: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
		success: PropTypes.bool.isRequired,
		_id: PropTypes.string.isRequired,
		dateCreate: PropTypes.string.isRequired,
		dateCompletion: PropTypes.String,
		color: PropTypes.string,
		tag: PropTypes.string,
	}).isRequired).isRequired,
	successTask: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired
}

export default TableBody
