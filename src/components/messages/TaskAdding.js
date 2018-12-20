import React from 'react';
import SVGplus from '../../other/img/plus-solid.svg';
import { Fab } from '@rmwc/fab';

const TaskAdding = ({ dialogAddTaskOpen }) => {
	
	return (
		<div className="task-tables-zero">
			Добавьте свою первую задачу прямо сейчас!
			<Fab
				mini
				onClick={dialogAddTaskOpen}
				icon={
					<SVGplus width="15" height="15" />
				} 
			/>
		</div>
	)
}

export default TaskAdding