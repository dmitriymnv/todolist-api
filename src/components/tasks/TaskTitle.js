import React from 'react';
import PropTypes from 'prop-types';
import { Fab } from '@rmwc/fab';

import SVGplus from '../../other/img/plus.svg';

const TaskTitle = ({ addTask }) => {
	const date = new Date();
	return (
		<span className="task-title">
			{`${date.toLocaleString('ru', {weekday: 'long'})} , ${date.getDate()}`}

			<Fab
				onClick={addTask}
				icon={
					<SVGplus width="30" height="30" />
				} 
			/>	

		</span>
	)
}

TaskTitle.propTypes = {
	addTask: PropTypes.func.isRequired
}

export default TaskTitle
