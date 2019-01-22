import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from '@rmwc/card';
import { Dialog, DialogContent } from '@rmwc/dialog';
import { Typography } from '@rmwc/typography';
import { ListDivider } from '@rmwc/list';

const FamilyNew = lazy(() => import('./FamilyNew'));
const FamilyExist = lazy(() => import('./FamilyExist'));
const AddFamilyForm = lazy(() => import('../../forms/AddFamilyForm'));
import { addNewFamilyMembers, responseJoinFamily } from '../../../ac/family';
import Loader from '../../loader';

export class Family extends Component {
	static propTypes = {
		family: PropTypes.shape({
			admin: PropTypes.string,
			invite: PropTypes.string,
			inviteUsers: PropTypes.arrayOf(PropTypes.string.isRequired),
			listUsers: PropTypes.arrayOf(
				PropTypes.shape({
					createdAt: PropTypes.node.isRequired,
					createdAt: PropTypes.node.isRequired,
					numberTasks: PropTypes.number.isRequired,
					username: PropTypes.string.isRequired,
				}).isRequired,
			),
		}).isRequired,
		username: PropTypes.string.isRequired,
	}

	state = {
		dialogOpen: false,
		loading: false
	}

	submit = (data, join = false) => {

		this.setState({ loading: true })

		if(join) {
			this.props.responseJoinFamily(data)
				.then((res) => {
					this.props.JoinMemberFamily(res)
					this.setState({ loading: false })
				})
		} else {
			return (
				this.props.addNewFamilyMembers(data)
					.then(() => this.setState({ dialogOpen: false, loading: false }))
			)
		}
	}

	render() {
		const { family, username } = this.props;
		const { dialogOpen, loading } = this.state;
		console.log(family)
		return (
			<Loader loading={loading}>
				<Card className="card__item card__item_family" outlined>

					<Typography className="card__item__title" use="subtitle1" tag="div">
						Семейная группа {family.admin && (family.admin == username ? '(Администратор)' : '(Участник)')}
					</Typography>

					<ListDivider />

					{family.admin ?
						<FamilyExist
							family={family}
							dialogOpen={() => this.setState({ dialogOpen: true })}
							username={username}
						/>
						 :
						<FamilyNew
							dialogOpen={() => this.setState({ dialogOpen: true })}
							JoinMemberFamily={(res) => this.submit(res, true)}
							loaderPage={(loading) => this.setState({ loading })}
							invite={family.invite}
						/>
					}

					<Dialog
						open={this.state.dialogOpen}
						onClose={() => this.setState({ dialogOpen: false })}
					>   
						<DialogContent>
							{dialogOpen &&
								<AddFamilyForm
									dialogOpen={dialogOpen}
									submit={this.submit}
								/>
							}
						</DialogContent>
					</Dialog>
					
				</Card>
			</Loader>
		)
	}
}

function mapStateToProps(state) {
	return {
		username: state.user.username
	}
}

export default connect(mapStateToProps, { 
	addNewFamilyMembers, responseJoinFamily
})(Family)
