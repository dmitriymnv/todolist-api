import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { login } from '../../ac/auth';
import { logout } from '../../ac/auth';
import './css/main';
import SvgAccount from '../../other/img/account';
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarActionItem
} from '@rmwc/top-app-bar';
import { Typography } from '@rmwc/typography';
import Loader from '../loader';
const LoginForm = lazy(() => import('../forms/LoginForm'));
const Menu = lazy(() => import('@rmwc/menu').then(e => ({ default: e.Menu })) );
const MenuItem = lazy(() => import('@rmwc/menu').then(e => ({ default: e.MenuItem })) );
const MenuSurfaceAnchor = lazy(() => import('@rmwc/menu').then(e => ({ default: e.MenuSurfaceAnchor })) );
const Dialog = lazy(() => import('@rmwc/dialog').then(e => ({ default: e.Dialog })) );
const Button = lazy(() => import('@rmwc/button').then(e => ({ default: e.Button })) );
const DialogContent = lazy(() => import('@rmwc/dialog').then(e => ({ default: e.DialogContent })) );

export class TopNavigation extends Component {

	static propTypes = {
		login: PropTypes.func.isRequired,
		logout: PropTypes.func.isRequired,
		username: PropTypes.string,
	}

	state = {
		data: {
			username: this.props.username,
		},
		menuIsOpen: false,
		dialogLoginOpen: false
	}

	componentWillReceiveProps(props) {
		this.setState({
			data: { username: props.username }
		})
	}

	profileAuth = () => {
		const { menuIsOpen, data } = this.state;	
		if(data.username) {
			return (
				<Suspense fallback={<Loader />}>
					<MenuSurfaceAnchor>
						<Menu
							open={menuIsOpen}
							onClose={() => this.setState({ menuIsOpen: false })}
							className='navigation-menu'
							anchorCorner='bottomLeft'
						>
							<MenuItem 
								disabled={true} 
								className='signed-item'
							>
								Авторизованы как: <span>{data.username}</span>
							</MenuItem>
							<MenuItem onClick={() => {
								this.props.logout()
								this.setState({ menuIsOpen: false })
							}}>Выйти</MenuItem>
						</Menu>

						<TopAppBarActionItem
							icon={<SvgAccount width='24' height='24' />} 
							onClick={() => this.setState({ menuIsOpen: !menuIsOpen })}
						/>
					</MenuSurfaceAnchor>
				</Suspense>
			)	
		} else {
			return (
				<Button
					onClick={() => this.setState({ dialogLoginOpen: true })}
				>
					Авторизация
				</Button>
			)
		}
	}

	authorization = () => {
		return (
			<Suspense fallback={<Loader />}>
				<Dialog
					open={this.state.dialogLoginOpen}
					onClose={() => this.setState({ dialogLoginOpen: false })}
				>   
					<DialogContent><LoginForm submit={this.submit}/></DialogContent>
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
							{this.profileAuth()}
						</TopAppBarSection>

						{this.state.dialogLoginOpen && this.authorization()}

					</TopAppBarRow>
				</TopAppBar>
			</Suspense>
		)
	}

}

const mapStateToProps = (state) => {
	return {
		username: state.user.username
	}
}

export default connect(mapStateToProps, { login, logout })(TopNavigation)
