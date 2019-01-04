import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabBar, Tab } from '@rmwc/tabs';

import './css/tabletasks'
import TaskAdding from '../messages/TaskAdding';
import Loader from '../loader';
import TableBody from './TableBody';

class TableTasks extends Component {
	static propTypes = {
		tasks: PropTypes.array.isRequired,
		successTask: PropTypes.func.isRequired,
		dialogOpen: PropTypes.func.isRequired,
		loadingNewTasks: PropTypes.func.isRequired,
		pageLoading: PropTypes.bool.isRequired
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
		const { tasks, successTask, dialogOpen, pageLoading } = this.props;
		return (
			<Loader opacity='0' loading={pageLoading}>
				{tasks.length === 0 ?
					<TaskAdding /> :
					<table className="task-tables">
						<thead>
							<tr>
								<div>
									<TabBar
										activeTabIndex={this.state.activeTab}
										onActivate={evt => this.setState({activeTab: evt.detail.index})}
									>
										<Tab>Личные</Tab>
										<Tab>Семейные</Tab>
										<Tab>Друзья</Tab>
									</TabBar>
								</div>
							</tr>
							<tr>
								<th>Выполнение</th>
								<th className="task-tables__title">Задача</th>
								<th>Дата создания</th>
								<th>Дата выполнения</th>
							</tr>
						</thead>
						<TableBody 
							onScrollList={this.onScrollList} 
							tasks={tasks}
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
