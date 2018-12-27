import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PrivateDateForm from '../forms/PrivateDateForm';
import { setPrivateDate } from '../../ac/auth'

export class PrivateDatePage extends Component {
	static propTypes = {
		push: PropTypes.func.isRequired,
		setPrivateDate: PropTypes.func.isRequired,
	}

	submit = (data) => {
		return (
			this.props.setPrivateDate(data)
		)
	}

	render() {
		return (
			<div className="flex-container">
				<PrivateDateForm submit={this.submit} />
			</div>
		)
	}
}

export default connect(null, { push, setPrivateDate })(PrivateDatePage)
