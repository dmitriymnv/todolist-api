import React from 'react';
import PropTypes from 'prop-types';

const ParseError = (error, i = undefined) => {
	if(error) {
		return (
			<div key={i} className="error">{error}</div>
		)
	}
	
}

ParseError.propTypes = {
	error: PropTypes.string,
}

export default ParseError
