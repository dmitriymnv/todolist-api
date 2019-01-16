import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from '@rmwc/typography';
// import { ListDivider } from '@rmwc/list';
import { ListItem } from '@rmwc/list';
import { Dialog, DialogContent } from '@rmwc/dialog';

import EditMemberFamily from '../../forms/EditMemberFamily';

class FamilyExist extends Component {

	static propTypes = {
		family: PropTypes.shape({
			admin: PropTypes.string.isRequired,
			listUsers: PropTypes.arrayOf(
				PropTypes.string.isRequired,
			).isRequired,
		}).isRequired,
	}

	state = {
		dialog: {
			open: false,
			purpose: undefined
		}
	}

	clickMember = (e) => {
		this.setState({
			dialog: {
				open: true,
				purpose: e.target.textContent
			}
		})
	}

	render() {
		const { family } = this.props;
		const { dialog: {open, purpose} } = this.state;
		return (
			<div className="card__item__body">

				<div className="card__item__list">

					<Typography
						use="subtitle1"
						tag="div"
					>
						Администратор группы:
					</Typography>

					<ListItem>{family.admin}</ListItem>

					<Typography
						use="subtitle1"
						tag="div"
					>
						Участники группы:
					</Typography>

					{family.listUsers.map((username, i) => {
						return (
							<ListItem
							 key={i}
							 onClick={this.clickMember}
							>
								{username}
							</ListItem>
						)
					})}
						
				</div>

				<Dialog
					open={open}
					onClose={() => this.setState({ dialog: { open: false } })}
				>   
					<DialogContent>
						<EditMemberFamily user={purpose} />
					</DialogContent>
				</Dialog>

			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		family: state.family
	}
}

export default connect()(FamilyExist)
