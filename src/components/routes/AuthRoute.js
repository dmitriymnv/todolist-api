import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const QuestRoute = ({ auth, component: Component, to, user, ...rest}) => {
	return (
		<Route 
			{...rest} 
			render={props => auth === (user || false) ? <Component {...props} /> : <Redirect to={to}/>} 
		/>
	)
}

QuestRoute.propTypes = {
	auth: PropTypes.bool.isRequired,
	component: PropTypes.object.isRequired,
	to: PropTypes.string.isRequired,
	user: PropTypes.bool
};

function mapStateToProps(state) {
	return {
		auth: !!state.user.username
	}
}

export default connect(mapStateToProps)(QuestRoute);
