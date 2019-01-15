import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from '@rmwc/typography';
import { ListDivider } from '@rmwc/list';
import { ListItem } from '@rmwc/list';

class FamilyExist extends Component {

	static propTypes = {
		family: PropTypes.shape({
			admin: PropTypes.string.isRequired,
			listUsers: PropTypes.arrayOf(
				PropTypes.string.isRequired,
			).isRequired,
		}).isRequired,
	}

	render() {
		const { family: {admin, listUsers} } = this.props;
		return (
			<div className="card__item__body">

				<div className="family-list card__item__list">
					<Typography
						className="family-list__title"
						use="subtitle1"
						tag="div"
					>
						Администратор группы:
					</Typography>

					<div className="family-list__body">
						<ListItem>{admin}</ListItem>
					</div>	
				</div>

				<div className="family-list card__item__list">
					<Typography
						className="family-list__title"
						use="subtitle1"
						tag="div"
					>
						Участники группы:
					</Typography>

					<div className="family-list__body">
						{listUsers.map((username, i) => {
							return <ListItem key={i}>{username}</ListItem>
						})}
					</div>	

				</div>

			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		family: state.family
	}
}

export default connect(mapStateToProps)(FamilyExist)
