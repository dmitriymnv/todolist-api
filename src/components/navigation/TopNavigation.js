import React, { Component } from 'react';
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

export class TopNavigation extends Component {

	static propTypes = {
		isAuth: PropTypes.bool.isRequired,
	}

	state = {
		date: {
			username: ""
		},
		auth: this.props.isAuth,
		menuIsOpen: false
	}

	render() {
		const { auth, date } = this.state;
		return (
			<TopAppBar>
				<TopAppBarRow className="container-fluid">

					<TopAppBarSection alignStart>
						<TopAppBarTitle>Todolist</TopAppBarTitle>
					</TopAppBarSection>

					<TopAppBarSection alignEnd>
						{this.profileAuth(auth)}
					</TopAppBarSection>

				</TopAppBarRow>
			</TopAppBar>
		)
	}

	profileAuth = auth => {
		const { menuIsOpen } = this.state;
		if(auth) {
			return (
				<MenuSurfaceAnchor>

					<Menu
						open={menuIsOpen}
						onClose={evt => this.setState({menuIsOpen: false})}
						anchorCorner='bottomLeft'
					>
						<MenuItem>Выйти</MenuItem>
					</Menu>

					<TopAppBarActionItem icon={
						<IconAccount width='24' height='24' />} onClick={evt => this.setState({menuIsOpen: !menuIsOpen})}
					/>

				</MenuSurfaceAnchor>
			)
		} else {
			return <Button>Авторизация</Button>
		}
	}

}

const mapStateToProps = (state) => {
	return {
		isAuth: !!state.user.token
	}
}

export default connect(mapStateToProps)(TopNavigation);
