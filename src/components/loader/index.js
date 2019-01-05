import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@rmwc/circular-progress';

import './css/main';

const Loader = ({ children, loading = 'false', size = 72, opacity = 0.25 }) => {
	return (
		<div className={`loader ${loading ? 'loader_active' : ''}`}>
			{children &&
			<div style={loading ? { opacity } : undefined}>
				{children} 
			</div>
			}
			{loading && <CircularProgress className="loader__circular" size={size} />}
		</div>
	)
}

Loader.propTypes = {
	children: PropTypes.element,
	loading: PropTypes.bool,
	opacity: PropTypes.number,
	size: PropTypes.number
}

export default Loader