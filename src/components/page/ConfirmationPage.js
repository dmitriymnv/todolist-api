import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Loader from '../loader';
import { confirm } from '../../ac/auth'
import { title } from '../../constans';

class ConfirmationPage extends Component {
	static propTypes = {
		confirm: PropTypes.func.isRequired,
		push: PropTypes.func.isRequired
	}

	state = {
		loading: true,
		success: false
	}

	componentWillMount() {
		document.title = 'Подтверждение электронной почты' + title;
	}

	componentDidMount() {
		this.props.confirm(this.props.match.params.token)
			.then(() => this.props.push(
				'/tasks', { alertText: 'Вы успешно подтвердили свою электронную почту' }
			))
			.catch(() => this.setState({ loading: false, success: false }));
	}

	render() {
		const { loading, success } = this.state;
		return (
			<Loader loading={loading}>
				{!loading && !success ? <div>Ошибка, невалидный токен!</div> : <></>}
			</Loader>
		)
	}
}

export default connect(null, { confirm, push })(ConfirmationPage)