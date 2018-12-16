import React from 'react';
import PropTypes from 'prop-types';
import SvgCross from '../../other/img/times-solid.svg';

const ShowConfirmEmail = ({ delMessage }) => {
	return (
		<div className="show-message">
			<span>На электронную почту, указанную при регистрации, отправлено письмо для подтверждения вашего аккаунт</span>
			<span
				onClick={delMessage} 
				className="icon"
			>
				<SvgCross width="15" height="15" />
			</span>
		</div>
	)
}

ShowConfirmEmail.propTypes = {
	delMessage: PropTypes.func.isRequired
}

export default ShowConfirmEmail