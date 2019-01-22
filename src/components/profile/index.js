import React, { Component } from 'react'
import { connect } from 'react-redux'

import './css/main'
import './css/card'
import Personal from './Card/Personal'
import Family from './Card/Family'
import Statistics from './Card/Statistics'
import { loadingProfile } from '../../ac/user'
import Loader from '../loader';

class Profile extends Component {

	state = {
		data: {
			user: {},
			family: {}
		},
		loading: true
	}

	componentDidMount() {
		this.props.loadingProfile()
			.then((res) => {
				this.setState({ data: { ...res }, loading: false })
			})
	}

	render() {
		const { data: { user, family }, loading } = this.state;
		return (
			<Loader loading={loading} opacity='0'>
				<div className="card">
					<Personal />
					<Family family={family} />
					<Statistics tasks={user.tasks} />
				</div>
			</Loader>
		)
	}
}

export default connect(null, { loadingProfile })(Profile)
