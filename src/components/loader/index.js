import React from 'react'
import { CircularProgress } from '@rmwc/circular-progress';
import './css/main';

export default ({ children, loading }) => {
	return (
		<>
			<div className={loading ? 'loader-enabled': undefined}>
				{children} 
			</div>
			
			{loading && <CircularProgress className="loader" size={72} />}
		</>
	)
}
