import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@rmwc/typography';

import { title } from '../../constans';
import Profile from '../profile';

export class Initialpage extends Component {
	static propTypes = {
		push: PropTypes.func.isRequired
	}

	componentWillMount() {
		document.title = 'Личный кабинет' + title;
	}

	render() {
		const { username, push } = this.props;
		return (
			<div className="profile-page">
				<Typography
					tag="h1"
					use="headline5"
				>
					Личный кабинет
				</Typography>

				
				<Profile />

			</div>
		)
	}
}

export default Initialpage
