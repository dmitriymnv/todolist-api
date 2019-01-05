import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SvgCross from '../../other/img/times-solid';
import './css/message';

export class Message extends Component {
	static propTypes = {
		alertText: PropTypes.string,
	}

	state = {
		show: true,
		alertText: this.props.alertText
	}

	delMessage = () => {
		if(this.state.alertText) {
			this.setState({ show: false });
		} else {
			localStorage.removeItem('showConfirmationEmail');
			this.setState({ show: false });
		}
	}

	render() {
		const { show, alertText } = this.state;
		if (show) {
			return (
				<div className="message">
					<span>
						{alertText || 
							'На электронную почту, указанную при регистрации, отправлено письмо для подтверждения вашего аккаунта'
						}
					</span>
					<span
							onClick={this.delMessage} 
							className="message__icon"
						>
							<SvgCross className="message__icon-svg" width="15" height="15" />
						</span>
				</div>
			)
		}
		return null;
	}

}

export default Message
