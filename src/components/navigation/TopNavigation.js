import React, { Component, lazy, Suspense } from 'react';
import './css/main.sass';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
const Dialog  = lazy(() => import('@rmwc/dialog').then(e => ({ default: e.Dialog })) );
const DialogTitle  = lazy(() => import('@rmwc/dialog').then(e => ({ default: e.DialogTitle })) );
const DialogContent  = lazy(() => import('@rmwc/dialog').then(e => ({ default: e.DialogContent })) );
const LoginForm = lazy(() => import('../forms/LoginForm'));
import { login } from '../../ac/auth';

export class TopNavigation extends Component {

	static propTypes = {
		auth: PropTypes.bool.isRequired,
		login: PropTypes.func.isRequired,
	}

	state = {
		date: {
			username: ""
		},
		menuIsOpen: false,
		dialogLoginOpen: false
	};

	profileAuth = auth => {
		const { menuIsOpen } = this.state;		
		if(this.props.auth) {
			return (
				<MenuSurfaceAnchor>

					<Menu
						open={menuIsOpen}
						onClose={() => this.setState({menuIsOpen: false})}
						anchorCorner='bottomLeft'
					>
						<MenuItem>Выйти</MenuItem>
					</Menu>

					<TopAppBarActionItem icon={
						<IconAccount width='24' height='24' />} onClick={() => this.setState({menuIsOpen: !menuIsOpen})}
					/>

				</MenuSurfaceAnchor>
			)	
		} else {
			return <Button onClick={() => this.setState({dialogLoginOpen: true})}>Авторизация</Button>
		}
	};

	authorization = () => {
		return (
			<Suspense fallback={<></>}>
				<Dialog
					open={this.state.dialogLoginOpen}
					onClose={() => this.setState({dialogLoginOpen: false})}
				>    
					<DialogTitle>Авторизация</DialogTitle>
					<DialogContent><LoginForm submit={this.submit}/></DialogContent>
				</Dialog>
			</Suspense>
		)
	};

	submit = (data) =>
		this.props.login(data)
			.then(() => this.setState({ dialogLoginOpen: false }));

	render() {
		return (
			<TopAppBar>
				<TopAppBarRow className="container-fluid">

					<TopAppBarSection alignStart>
						<TopAppBarTitle>Todolist</TopAppBarTitle>	
					</TopAppBarSection>

					<TopAppBarSection alignEnd>
						{this.profileAuth()}
					</TopAppBarSection>

					{this.state.dialogLoginOpen && this.authorization()}

				</TopAppBarRow>
			</TopAppBar>
		)
	};

}

const mapStateToProps = (state) => {
	return {
		auth: !!state.user.token
	}
}

export default connect(mapStateToProps, { login })(TopNavigation);
