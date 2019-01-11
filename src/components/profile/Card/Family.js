import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from '@rmwc/card';
import { Dialog, DialogContent } from '@rmwc/dialog';

const FamilyNew = lazy(() => import('./FamilyNew'));
const FamilyExist = lazy(() => import('./FamilyExist'));
const AddFamilyForm = lazy(() => import('../../forms/AddFamilyForm'));
import { addNewFamilyMembers } from '../../../ac/family';

export class Family extends Component {
	static propTypes = {
		family: PropTypes.shape({
			admin: PropTypes.bool.isRequired,
			list: PropTypes.arrayOf(
				PropTypes.string.isRequired,
			).isRequired,
		}).isRequired,
		addNewFamilyMembers: PropTypes.func.isRequired,
	}

	state = {
		dialogOpen: false
	}

	submit = (data) => {
		return (
			this.props.addNewFamilyMembers(data)
		)
	}

	render() {
		const { family: {admin, list} } = this.props;
		const { dialogOpen } = this.state;
		return (
			<Card className="card__item card__item_family" outlined>
				{list.length == 0 ?
					<FamilyNew
						dialogOpen={() => this.setState({ dialogOpen: true })}
					/> :
				 <FamilyExist />
				}

			<Dialog
				open={this.state.dialogOpen}
				onClose={() => this.setState({ dialogOpen: false })}
			>   
				<DialogContent>
					<AddFamilyForm
						dialogOpen={dialogOpen}
						submit={this.submit}
					/>
				</DialogContent>
			</Dialog>
		</Card>
		)
	}
}

function mapStateToProps(state) {
	return {
		family: state.family
	}
}

export default connect(mapStateToProps, { addNewFamilyMembers })(Family)
