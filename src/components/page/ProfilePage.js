import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';
import { 
	Card, 
	CardActionButtons } from '@rmwc/card';
import { ListDivider } from '@rmwc/list';

import './css/profilepage';
import { title } from '../../constans';

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
			<>
				<Typography
					use="headline5"
					tag='h1'
				>
					Личный кабинет
				</Typography>

				<div className="profile-card personal">
					<Card outlined>
						<Typography className="title" use="subtitle1" tag="div">
							Личные данные
						</Typography>

						<ListDivider />

						<div className="card-body">
							<Typography use="headline6" tag="div">
								Привет, {username}
							</Typography>
								
							
							<CardActionButtons className="buttons">
								<Button onClick={() => push('/profile/private-date')}>Изменение личных данных</Button>
								<Button onClick={() => push('/profile/password')}>Измение пароля</Button>
							</CardActionButtons>
								
							
						</div>
					</Card>
				</div>

				{/* <div className="profile-card personal">
					<Card outlined>
						<Typography className="title" use="subtitle1" tag="div">
							Рассылки
						</Typography>

						<ListDivider />

						<div className="card-body">
							<Typography use="headline5" tag="div">
								Привет, {username}
							</Typography>
								
							
							<CardActionButtons className="buttons">
								<Button onClick={() => push('/profile/private-date')}>Изменение личных данных</Button>
								<Button onClick={() => push('/profile/password')}>Измения пароля</Button>
							</CardActionButtons>
								
							
						</div>
					</Card>
				</div> */}

			</>
		)
	}
}

function mapStateToProps(state) {
	return {
		username: state.user.username
	}
}

export default connect(mapStateToProps, { push })(Initialpage)
