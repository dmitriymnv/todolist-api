import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection
} from '@rmwc/top-app-bar';
import { Typography } from '@rmwc/typography';

import { login } from '../../ac/auth';
import './css/main';
import Loader from '../loader';
const LoginForm = lazy(() => import('../forms/LoginForm'));
const Dialog = lazy(() => import('@rmwc/dialog').then(e => ({ default: e.Dialog })) );
const DialogContent = lazy(() => import('@rmwc/dialog').then(e => ({ default: e.DialogContent })) );
const ProfileAuth = lazy(() => import('./ProfileAuth'));

export class TopNavigation extends Component {

	static propTypes = {
		login: PropTypes.func.isRequired
	}

	state = {
		dialogLoginOpen: false
	}

	componentWillReceiveProps(props) {
		this.setState({
			data: { username: props.username }
		})
	}

	authorization = () => {
		return (
			<Suspense fallback={<Loader />}>
				<Dialog
					open={this.state.dialogLoginOpen}
					onClose={() => this.setState({ dialogLoginOpen: false })}
				>   
					<DialogContent>
						<LoginForm submit={this.submit}/>
					</DialogContent>
				</Dialog>
			</Suspense>
		)
	}

	submit = (data) => {
		return (
			this.props.login(data)
			.then(() => this.setState({ dialogLoginOpen: false }))
		)
	}

	render() {
		return (
			<Suspense fallback={<Loader />}>
				<TopAppBar fixed>
					<TopAppBarRow className="container-fluid">

						<TopAppBarSection alignStart>
							<Typography use="headline6" className="navigation-title">
								{<Link to={this.props.username ? '/tasks' : '/'}>Todolist</Link>}
							</Typography>
						</TopAppBarSection>

						<TopAppBarSection alignEnd>
							<ProfileAuth 
								dialogLoginOpen={() => this.setState({ dialogLoginOpen: true })}
							/>
						</TopAppBarSection>

						{this.state.dialogLoginOpen && this.authorization()}

					</TopAppBarRow>
				</TopAppBar>
			</Suspense>
		)
	}

}

export default connect(null, { login })(TopNavigation)
