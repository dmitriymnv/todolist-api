import React from 'react';
import PropTypes from 'prop-types';

const ParseError = error => {
	if(error) {
		return (
			<div className="error">{error}</div>
		)
	}
	
}

ParseError.propTypes = {
	error: PropTypes.string,
}

export default ParseError
