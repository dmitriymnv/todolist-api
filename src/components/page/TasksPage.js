import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import './css/taskspage';
import { connect } from 'react-redux';
import Tasks from '../tasks';
const ConfirmEmail = lazy(() => import('../messages/ConfirmEmail'));

export class TasksPage extends Component {
	static propTypes = {
		router: PropTypes.object.isRequired,
	}

	state = {

	}

	render() {
		const showConfirmationEmail = localStorage.getItem('showConfirmationEmail');
		const { alertText } = this.props.router.state ? this.props.router.state : false;
		return (
			<div className="taskspage flex-container">
				{(showConfirmationEmail || alertText) && 
					<ConfirmEmail alertText={alertText} />
				}
				<Tasks />
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		router: state.router.location
	}
}

export default connect(mapStateToProps)(TasksPage)
