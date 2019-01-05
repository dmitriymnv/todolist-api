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
			<div className="profile-page">
				<Typography
					tag="h1"
					use="headline5"
				>
					Личный кабинет
				</Typography>

				
				<Card className="card card_personal" outlined>
					<Typography className="card__title" use="subtitle1" tag="div">
						Личные данные
					</Typography>

					<ListDivider />

					<div className="card__body">
						<Typography use="headline6" tag="div">
							Привет, {username}
						</Typography>
							
						
						<CardActionButtons className="card__buttons">
							<Button onClick={() => push('/profile/private-date')}>Изменение личных данных</Button>
							<Button onClick={() => push('/profile/password')}>Измение пароля</Button>
						</CardActionButtons>
							
						
					</div>

				</Card>

			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		username: state.user.username
	}
}

export default connect(mapStateToProps, { push })(Initialpage)
