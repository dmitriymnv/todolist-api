import React, { Component } from 'react';
import './main.sass';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconAccount from './account.svg';
import SVG from 'react-inlinesvg';
import { Button } from '@rmwc/button';

export class TopNavigation extends Component {

	static propTypes = {
		isAuth: PropTypes.bool.isRequired,
	}

	state = {
		date: {
			username: ""
		},
		auth: this.props.isAuth
	}

	render() {
		const { auth, date } = this.state;
		return (
			<></>
		)
	}

}

const mapStateToProps = (state) => {
	return {
		isAuth: !!state.user.token
	}
}

export default connect(mapStateToProps)(TopNavigation);
