import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import './css/taskspage';
const ShowConfirmEmail = lazy(() => import('../messages/ShowConfirmEmail'));

export class TasksPage extends Component {
	static propTypes = {

	}

	state = {

	}

	componentDidMount() {
		if(localStorage.getItem('showConfirmationEmail')) {
			this.setState({ 
				...this.state, showConfirmationEmail: true
			})
		}
	}

	delConfirmationEmail = () => {
		localStorage.removeItem('showConfirmationEmail');
		this.setState({ showConfirmationEmail: false })
	}

	render() {
		const { showConfirmationEmail } = this.state;
		return (
			<div className="taskspage">
				{showConfirmationEmail && 
					<ShowConfirmEmail delMessage={this.delConfirmationEmail} />
				}
			</div>
		)
	}
}

export default TasksPage
