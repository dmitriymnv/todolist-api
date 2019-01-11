import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Menu, MenuItem, MenuSurfaceAnchor } from '@rmwc/menu';
import { Button } from '@rmwc/button';
import { TopAppBarActionItem } from '@rmwc/top-app-bar';

import SvgAccount from '../../other/img/account';
import { logout } from '../../ac/auth';

export class ProfileAuth extends Component {
	static propTypes = {
		dialogLoginOpen: PropTypes.func.isRequired,
		logout: PropTypes.func.isRequired,
		push: PropTypes.func.isRequired,
		username: PropTypes.string,
	}

	state = {
		open: false
	}
	
	render() {
		const { open } = this.state;
		const { dialogLoginOpen, logout, push, username } = this.props;
		if(username) {
			return (
				<MenuSurfaceAnchor>
					<Menu
						open={open}
						onClose={() => this.setState({ open: false })}
						className='navigation-menu'
						anchorCorner='bottomLeft'
					>

						<MenuItem 
							disabled={true} 
							className='signed-item'
						>
							Авторизованы как: <span>{username}</span>
						</MenuItem>

						<MenuItem onClick={() => {
							push('/profile');
							this.setState({ open: false })
						}}>Личный кабинет</MenuItem>

						<MenuItem onClick={() => {
							logout();
							this.setState({ open: false });
						}}>Выйти</MenuItem>

					</Menu>

					<TopAppBarActionItem
						icon={<SvgAccount width='24' height='24' />} 
						onClick={() => this.setState({ open: true })}
					/>
				</MenuSurfaceAnchor>
			)	
		} else {
			return (
				<Button onClick={dialogLoginOpen}>
					Авторизация
				</Button>
			)
		}
	}
}

const mapStateToProps = (state) => {
	return {
		username: state.user.username
	}
}

export default connect(mapStateToProps, { logout, push })(ProfileAuth)