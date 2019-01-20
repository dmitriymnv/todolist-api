import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loader from '../../loader';
import TableTr from './TableTr';
import { OPTIONS_DATE } from '../../../constans';

export class TableBody extends Component {
	static propTypes = {
		tasks: PropTypes.object.isRequired,
		dialogOpen: PropTypes.func.isRequired,
		successTask: PropTypes.func.isRequired,
		activeTab: PropTypes.number.isRequired,
		onScrollList: PropTypes.func.isRequired
	}

	state = {
		loading: false,
		loaded: false
	}

	componentWillReceiveProps({ activeTab }) {
		this.state.loaded != activeTab && this.setState({ loaded: false })
	}

	onScrollList = (e) => {
		const { loading, loaded } = this.state;

		if(!loading && !loaded) {
			const { scrollTop, offsetHeight, scrollHeight } = e.target;
	
			if(200 + scrollTop + offsetHeight >= scrollHeight) {
				this.setState({ loading: true });
				this.props.onScrollList()
					.then((res) => {
						this.setState({ loading: false, loaded: res})
				})
			}
				
		}
	}

	render() {
		const { tasks, activeTab, successTask, dialogOpen } = this.props;
		return (
			<tbody className="task-table__body" onScroll={e => this.onScrollList(e)}>
				{Object.keys(tasks[activeTab]).length > 0 ? 
					tasks[activeTab] && tasks[activeTab].map((task, i) => {
						return (
							<TableTr 
								task={task}
								key={i}
								successTask={() => successTask(task._id)}
								dialogOpen={() => dialogOpen('edit', i)}
								optionsDate={OPTIONS_DATE}
							/>
						)})
						:
					activeTab == 0 ? 
						<tr><td>У вас ещё нет личных задач!</td></tr> : <tr><td>У вас ещё нет семейных задач!</td></tr>
				}

				{this.state.loading &&
					<tr className="task-table__live-loading">
						<td><Loader loading size={35} /></td>
					</tr>
				}
			</tbody>
		)
	}
}

export default TableBody

