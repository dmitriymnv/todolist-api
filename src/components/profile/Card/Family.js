import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { Card } from '@rmwc/card';

import FamilyNew from './FamilyNew';
import FamilyExist from './FamilyExist';

const Personal = ({ family: { admin, list }, push }) => {
	return (
		<Card className="card__item card__item_family" outlined>
			{list.length == 0 ?
				 <FamilyNew
					admin={admin}
					list={list} 
					/> :
				 <FamilyExist />
			}
		</Card>
	)
}

Personal.propTypes = {
	family: PropTypes.shape({
		admin: PropTypes.bool.isRequired,
		list: PropTypes.arrayOf(
			PropTypes.string.isRequired,
		).isRequired,
	}).isRequired,
	push: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
	return {
		family: state.family
	}
}

export default connect(mapStateToProps, { push })(Personal)
