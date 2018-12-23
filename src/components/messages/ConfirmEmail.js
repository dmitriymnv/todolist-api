import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SvgCross from '../../other/img/times-solid';

export class ConfirmEmail extends Component {
	static propTypes = {
		confirmed: PropTypes.bool.isRequired,
	}

	state = {
		show: true,
		confirmed: this.props.confirmed
	}

	delConfirmationEmail = () => {
		localStorage.removeItem('showConfirmationEmail');
		this.setState({ show: false });
	}

	render() {
		const { show, confirmed } = this.state;
		if(show && confirmed) {
			return (
				<div className="show-message">
					<span>Вы успешно подтвердили свою электронную почту</span>
					<span
						onClick={() => this.setState({ show: false })} 
						className="icon"
					>
						<SvgCross width="15" height="15" />
					</span>
				</div>
			)
		} else if(show && !confirmed) {
			return (
				<div className="show-message">
					<span>На электронную почту, указанную при регистрации, отправлено письмо для подтверждения вашего аккаунт</span>
					<span
						onClick={this.delConfirmationEmail} 
						className="icon"
					>
						<SvgCross width="15" height="15" />
					</span>
				</div>
			)
		} else {
			return null
		}
	}
}

export default ConfirmEmail
