import React from 'react'
import { CircularProgress } from '@rmwc/circular-progress';
import './css/main';
import PropTypes from 'prop-types';

const Loader = ({ children, loading = 'false', className = '', size = 72, opacity = 0.25 }) => {
	return (
		<>
			{children ?
				<>
					<div
						style={loading ? { opacity } : null} 
						className={`${className} ${loading ? 'loader-enabled': ''}`}
					>
						{children} 
					</div> 
					{loading && <CircularProgress className="loader" size={size} />}
				</> :
				<>
					{loading && <CircularProgress className="loader" size={size} />}
				</>
		 	}
		</>
	)
}

Loader.propTypes = {
	children: PropTypes.element,
	loading: PropTypes.bool,
	className: PropTypes.string,
	size: PropTypes.number
}

export default Loader