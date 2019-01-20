import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@rmwc/checkbox';

import SvgCog from '../../../other/img/cog-solid';

const TableTr = ({ 
	task: { 
		success, color, title, tag, author, editAuthor,
		successAuthor, dateCompletion, dateCreate
	}, 
	optionsDate, 
	successTask, 
	dialogOpen }) => {
	return (
		<tr
			className={`${success? 'success ' : ''}${color}`}
		>
			<td className="task-table__task-checkbox">
				<Checkbox
					checked={success}
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
				<div>{title}</div>

				<div className="task-details task-table__task-details">
					{tag && <span className="task-details__item">Тег: {tag}</span>}
					{author && <span className="task-details__item">Автор: {author}</span>}
					{editAuthor && <span className="task-details__item">Последние изменение задачи от: {editAuthor}</span>}
					{successAuthor && <span className="task-details__item">Задачу выполнил: {successAuthor}</span>}
				</div>

			</td>
			<td>
				{new Date(dateCreate).toLocaleString('ru', optionsDate)}
			</td>
			<td>
				{dateCompletion ? 
					new Date(dateCompletion).toLocaleString('ru', optionsDate) : '-'
				}
			</td>
		</tr>
	)
}
TableTr.propTypes = {
	task: PropTypes.shape({
		title: PropTypes.string.isRequired,
		success: PropTypes.bool.isRequired,
		_id: PropTypes.string.isRequired,
		dateCreate: PropTypes.string.isRequired,
		dateCompletion: PropTypes.String,
		color: PropTypes.string,
		tag: PropTypes.string,
		author: PropTypes.string,
		editAuthor: PropTypes.string,
		successAuthor: PropTypes.string,
	}).isRequired,
	optionsDate: PropTypes.object.isRequired,
	successTask: PropTypes.func.isRequired,
	dialogOpen: PropTypes.func.isRequired,
}

export default TableTr
