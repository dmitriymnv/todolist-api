import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../css/tabletasks'
import TaskAdding from '../../messages/TaskAdding';
import Loader from '../../loader';
import TableBody from './TableBody';
import TableHead from './TableHead';

class TableTasks extends Component {
	static propTypes = {
		tasks: PropTypes.object.isRequired,
		successTask: PropTypes.func.isRequired,
		dialogOpen: PropTypes.func.isRequired,
		loading: PropTypes.bool.isRequired,
		activeTab: PropTypes.number.isRequired,
		onActivateTab: PropTypes.func.isRequired,
		onScrollList: PropTypes.func.isRequired,
	}

	render() {
		const { 
			tasks, successTask, dialogOpen, loading, 
			activeTab, onActivateTab, onScrollList
		} = this.props;	
		return (
			<Loader opacity={0} loading={loading}>
				{tasks.length === 0 ?
					<TaskAdding /> :
					<table className="task-table">
						<TableHead 
							activeTab={activeTab}
							onActivateTab={onActivateTab}
						/>
						<TableBody 
							tasks={tasks}
							activeTab={activeTab}
							successTask={successTask}
							dialogOpen={dialogOpen}
							onScrollList={onScrollList}
						/>
					</table>
				}
			</Loader>
		)
	}
}

export default TableTasks 
