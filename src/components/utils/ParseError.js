import React from 'react';

export default (error) => {
	if(error) {
		return (
			<div className="error">{error}</div>
		)
	}
}