import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@rmwc/typography';

import '../css/memberfamily';
import { OPTIONS_DATE } from '../../../constans';

const MemberFamily = ({ user: { username, createdAt, numberTasks, successTasks } }) => {
	return (
		<div className="member-family">
			<Typography
				use="headline5"
				tag="h1"
				className="form__heading"
			>
				Пользователь {username}
			</Typography>

			<div className="member-family__item">
				Вступление в группу: {new Date(createdAt).toLocaleString('ru', OPTIONS_DATE)}
			</div>

			<div className="member-family__item">
				Количество опубликованных задач: {numberTasks}
			</div>

			<div className="member-family__item">
				Количество выполненных задач: {successTasks}
			</div>

		</div>
	)
}

MemberFamily.propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string.isRequired,
		createdAt: PropTypes.node.isRequired,
		numberTasks: PropTypes.number.isRequired,
		successTasks: PropTypes.number.isRequired
	}).isRequired
}

export default MemberFamily
