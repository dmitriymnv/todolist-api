import React, { Component, lazy, Suspense } from 'react';
import './css/main.sass';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconAccount from './account.svg';
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarActionItem,
  TopAppBarTitle
} from '@rmwc/top-app-bar';
import { Button } from '@rmwc/button';
import { Menu, MenuItem, MenuSurfaceAnchor } from '@rmwc/menu';
import { Typography } from '@rmwc/typography';
const Dialog  = lazy(() => import('@rmwc/dialog').then(e => ({ default: e.Dialog })) );
const DialogContent  = lazy(() => import('@rmwc/dialog').then(e => ({ default: e.DialogContent })) );
const LoginForm = lazy(() => import('../forms/LoginForm'));
import { login } from '../../ac/auth';
import { logout } from '../../ac/auth';

export class TopNavigation extends Component {

	static propTypes = {
		auth: PropTypes.bool.isRequired,
		login: PropTypes.func.isRequired,
		logout: PropTypes.func.isRequired,
	}

	state = {
		data: {},
		menuIsOpen: false,
		dialogLoginOpen: false
	}

	profileAuth = () => {
		const { menuIsOpen, data } = this.state;				
		if(this.props.auth) {
			return (
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
						icon={<IconAccount width='24' height='24' />} 
						onClick={() => this.setState({ menuIsOpen: !menuIsOpen })}
					/>
				</MenuSurfaceAnchor>
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
			<Suspense fallback={<></>}>
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
			<TopAppBar fixed>
				<TopAppBarRow className="container-fluid">

					<TopAppBarSection alignStart>
						<Typography use="headline6" className="navigation-title">
							{<Link to={this.props.auth ? '/tasks' : '/'}>Todolist</Link>}
						</Typography>
					</TopAppBarSection>

					<TopAppBarSection alignEnd>
						{this.profileAuth()}
					</TopAppBarSection>

					{this.state.dialogLoginOpen && this.authorization()}

				</TopAppBarRow>
			</TopAppBar>
		)
	}

}

const mapStateToProps = (state) => {
	return {
		auth: !!state.user.token
	}
}

export default connect(mapStateToProps, { login, logout })(TopNavigation);
