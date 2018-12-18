import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { confirm } from '../../ac/auth'
import Loader from '../loader';

class ConfirmationPage extends Component {
	static propTypes = {
		confirm: PropTypes.func.isRequired,
		push: PropTypes.func.isRequired
	}

	state = {
		loading: true,
		success: false
	}

	componentDidMount() {
		this.props.confirm(this.props.match.params.token)
			.then(() => this.props.push('/tasks', { confirmedEmail: true }))
			.catch(() => this.setState({ loading: false, success: false }));
	}

	render() {
		const { loading, success } = this.state;
		return (
			<Loader loading={loading}>
				{!loading && !success && <div>Ошибка, невалидный токен!</div>}
			</Loader>
		)
	}
}

export default connect(null, { confirm, push })(ConfirmationPage)