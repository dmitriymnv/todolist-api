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
import { addNewFamilyMembers, loadingFamily } from '../../../ac/family';
import Loader from '../../loader';

export class Family extends Component {
	static propTypes = {
		family: PropTypes.shape({
			admin: PropTypes.string,
			invite: PropTypes.string,
		}).isRequired,
		addNewFamilyMembers: PropTypes.func.isRequired,
		username: PropTypes.string.isRequired,
	}

	state = {
		dialogOpen: false,
		loading: false
	}

	componentDidMount() {
		const { loadingFamily } = this.props;
		loadingFamily()
	}

	submit = (data) => {
		return (
			this.props.addNewFamilyMembers(data)
				.then(() => this.setState({ dialogOpen: false }))
		)
	}

	render() {
		const { family, username } = this.props;
		const { dialogOpen, loading } = this.state;
		return (
			<Loader loading={loading}>
				<Card className="card__item card__item_family" outlined>

					<Typography className="card__item__title" use="subtitle1" tag="div">
						Семейные задачи {family.admin && family.admin == username ? '(Администратор)' : '(Участник)'}
					</Typography>

					<ListDivider />

					{family.admin ?
						<FamilyExist
							family={family}
							username={username}
						/>
						 :
						<FamilyNew
							dialogOpen={() => this.setState({ dialogOpen: true })}
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
		family: state.family,
		username: state.user.username
	}
}

export default connect(mapStateToProps, {
	addNewFamilyMembers, loadingFamily
})(Family)
