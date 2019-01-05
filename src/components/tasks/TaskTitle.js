import React from 'react';
import PropTypes from 'prop-types';
import { Fab } from '@rmwc/fab';

import SVGplus from '../../other/img/plus.svg';

const TaskTitle = ({ addTask }) => {
	const date = new Date();
	return (
		<div className="tasks-page__title">
			{`${date.toLocaleString('ru', {weekday: 'long'})} , ${date.getDate()}`}

			<Fab
				onClick={addTask}
				className="tasks-page__title-button"
				icon={
					<SVGplus width="30" height="30" />
				} 
			/>	

		</div>
	)
}

TaskTitle.propTypes = {
	addTask: PropTypes.func.isRequired
}

export default TaskTitle
