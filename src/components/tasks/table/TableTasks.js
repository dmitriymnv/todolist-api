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
		pageLoading: PropTypes.bool.isRequired,
		activeTab: PropTypes.number.isRequired,
		onActivateTab: PropTypes.func.isRequired,
		onScrollList: PropTypes.func.isRequired,
	}

	state = {
		loading: false
	}

	render() {
		const { 
			tasks, successTask, dialogOpen, pageLoading, 
			activeTab, onActivateTab, onScrollList
		} = this.props;	
		
		return (
			<Loader loading={pageLoading}>
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
							loading={this.state.loading}
							onScrollList={onScrollList}
						/>
					</table>
				}
			</Loader>
		)
	}
}

export default TableTasks 
