import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
		isFamily: PropTypes.bool.isRequired,
	}

	render() {
		const { 
			tasks, successTask, dialogOpen, loading, 
			activeTab, onActivateTab, onScrollList,
			isFamily
		} = this.props;
		return (
			<Loader opacity={0} loading={loading}>
				{isFamily || tasks[activeTab].length > 0 ?
					<table className="task-table">
						<TableHead
							isFamily={isFamily}
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
					</table> :
					<TaskAdding />
				}
			</Loader>
		)
	}
}

function mapStateToProps(state) {
	return {
		isFamily: !!state.user.family.admin
	}
}

export default connect(mapStateToProps)(TableTasks) 
