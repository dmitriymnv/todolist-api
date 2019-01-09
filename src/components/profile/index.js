import React from 'react';

import './css/main';
import './css/card'
import Personal from './Card/Personal'
import Family from './Card/Family'

const Profile = () => {
	return (
		<div>
			
			<div className="card">
				<Personal />
				<Family />
			</div>

		</div>
	)
}

export default Profile
