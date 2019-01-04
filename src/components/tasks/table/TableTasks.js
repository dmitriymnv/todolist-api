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
		loadingNewTasks: PropTypes.func.isRequired,
		pageLoading: PropTypes.bool.isRequired,
		activeTab: PropTypes.number.isRequired,
		onActivateTab: PropTypes.func.isRequired,
	}

	state = {
		loading: false,
		loaded: false
	}

	onScrollList = (e) => {
		const { scrollTop, offsetHeight, scrollHeight } = e.target;
		const { loading, loaded } = this.state
		const isCilentAtBottom = 200 + scrollTop + 
			offsetHeight >= scrollHeight;

		if(isCilentAtBottom && !loading && !loaded) {
			this.setState({ loading: true });
			this.props.loadingNewTasks()
				.then((res) => {
					this.setState({ loading: false, loaded: res })
				})
		}
  }

	render() {
		const { 
			tasks, successTask, dialogOpen, pageLoading, activeTab, onActivateTab
		} = this.props;		
		return (
			<Loader opacity='0' loading={pageLoading}>
				{tasks.length === 0 ?
					<TaskAdding /> :
					<table className="task-tables">
						<TableHead 
							activeTab={activeTab}
							onActivateTab={onActivateTab}
						/>
						<TableBody 
							onScrollList={this.onScrollList} 
							tasks={tasks}
							activeTab={activeTab}
							successTask={successTask}
							dialogOpen={dialogOpen}
							loading={this.state.loading}
						/>
					</table>
				}
			</Loader>
		)
	}
}

export default TableTasks 
