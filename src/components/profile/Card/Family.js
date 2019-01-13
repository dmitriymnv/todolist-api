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
			admin: PropTypes.string,
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
		const { family: { adminFamily, invite } } = this.props;
		const { dialogOpen, loading } = this.state;
		return (
			<Loader loading={loading}>
				<Card className="card__item card__item_family" outlined>

					<Typography className="card__item__title" use="subtitle1" tag="div">
						Семейные задачи
					</Typography>

					<ListDivider />

					{adminFamily ?
						<FamilyExist />
						 :
						<FamilyNew
							dialogOpen={() => this.setState({ dialogOpen: true })}
							loaderPage={(loading) => this.setState({ loading })}
							invite={invite}
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
		family: state.family
	}
}

export default connect(mapStateToProps, {
	addNewFamilyMembers
})(Family)
