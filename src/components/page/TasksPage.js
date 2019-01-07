import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './css/taskspage';
import { title } from '../../constans';
import Tasks from '../tasks';
const Message = lazy(() => import('../messages/Message'));

export class TasksPage extends Component {
	static propTypes = {
		router: PropTypes.object.isRequired,
	}

	state = {

	}

	componentWillMount() {
		document.title = 'Список задач' + title;
	}

	render() {
		const showConfirmationEmail = localStorage.getItem('showConfirmationEmail');
		const { alertText } = this.props.router.state ? this.props.router.state : false;
		document.title = 'Список задач'
		return (
			<div className="tasks-page flex-container">
				{(showConfirmationEmail || alertText) && 
					<Message alertText={alertText} />
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
