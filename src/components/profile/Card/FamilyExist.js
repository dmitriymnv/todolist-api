import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@rmwc/typography';
import { ListItem } from '@rmwc/list';
import { Dialog, DialogContent } from '@rmwc/dialog';
import { Button } from '@rmwc/button';
import { CardActionButtons } from '@rmwc/card';

import MemberFamily from './MemberFamily';

class FamilyExist extends Component {

	static propTypes = {
		family: PropTypes.shape({
			admin: PropTypes.string.isRequired,
			listUsers: PropTypes.arrayOf(
				PropTypes.shape({
					username: PropTypes.string.isRequired,
					numberTasks: PropTypes.number.isRequired,
					createdAt: PropTypes.node.isRequired,
				}).isRequired,
			).isRequired,
		}).isRequired,
		username: PropTypes.string.isRequired,
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
		const { family: { admin, listUsers }, username, dialogOpen } = this.props;
		const { dialog: {open, purpose} } = this.state;
		const isAdmin = admin == username;
		return (
			<div className="card__item__body family-exist">

				<div className="card__item__list">
					<Typography
						use="subtitle1"
						tag="div"
					>
						Администратор группы:
					</Typography>

					<ListItem>{admin}</ListItem>

					<Typography
						use="subtitle1"
						tag="div"
					>
						Участники группы:
					</Typography>

					{listUsers.map((member, i) => {
						return (
							<ListItem
							 key={i}
							 onClick={this.clickMember}
							>
								{member.username}
							</ListItem>
						)
					})}
				</div>

				{(isAdmin && listUsers.length < 20) &&
					<div className="card__item__list family-exist__adding">
						<CardActionButtons className="card__item__buttons family-exist__adding__buttons">
							<Button onClick={dialogOpen} raised>Добавить пользователя</Button>
						</CardActionButtons>
					</div>
				}

				{open &&
					<Dialog
						open={open}
						onClose={() => this.setState({ dialog: { open: false } })}
					>   
						<DialogContent>
							<MemberFamily
								user={listUsers.filter(user => {
									if(user.username == purpose) {
										return user;
									}
								})[0]}
							/>
						</DialogContent>
					</Dialog>
				}

			</div>
		)
	}
}

export default FamilyExist
