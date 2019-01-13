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
import { addNewFamilyMembers } from '../../../ac/family';
import Loader from '../../loader';

export class Family extends Component {
	static propTypes = {
		family: PropTypes.shape({
			admin: PropTypes.bool.isRequired,
			list: PropTypes.arrayOf(
				PropTypes.string.isRequired,
			).isRequired,
			invite: PropTypes.string,
		}).isRequired,
		addNewFamilyMembers: PropTypes.func.isRequired,
	}

	state = {
		dialogOpen: false,
		loading: false
	}

	submit = (data) => {
		return (
			this.props.addNewFamilyMembers(data)
				.then(() => this.setState({ dialogOpen: false }))
		)
	}

	render() {
		const { family: {admin, list, invite} } = this.props;
		const { dialogOpen, loading } = this.state;
		return (
			<Loader loading={loading}>
				<Card className="card__item card__item_family" outlined>

					<Typography className="card__item__title" use="subtitle1" tag="div">
						Семейные задачи
					</Typography>

					<ListDivider />

					{list.length == 0 ?
						<FamilyNew
							dialogOpen={() => this.setState({ dialogOpen: true })}
							loaderPage={(loading) => this.setState({ loading })}
							invite={invite}
						/> :
					<FamilyExist />
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
		family: state.family
	}
}

export default connect(mapStateToProps, {
	addNewFamilyMembers
})(Family)
