import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { Button } from '@rmwc/button';
import { 
	Card, 
	CardActionButtons } from '@rmwc/card';
import { ListDivider } from '@rmwc/list';
import { Typography } from '@rmwc/typography';

const Personal = ({ username, push }) => {
	return (
		<Card className="card__item card__item_personal" outlined>
			<Typography className="card__item__title" use="subtitle1" tag="div">
				Личные данные
			</Typography>

			<ListDivider />

			<div className="card__item__body">
				<Typography use="headline6" tag="div">
					Привет, {username}
				</Typography>
					
				
				<CardActionButtons className="card__item__buttons">
					<Button onClick={() => push('/profile/private-date')}>Изменение личных данных</Button>
					<Button onClick={() => push('/profile/password')}>Измение пароля</Button>
				</CardActionButtons>
					
				
			</div>

		</Card>
	)
}

Personal.propTypes = {
	username: PropTypes.string.isRequired,
	push: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
	return {
		username: state.user.username
	}
}

export default connect(mapStateToProps, { push })(Personal)
