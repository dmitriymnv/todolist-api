import decode from 'jwt-decode';

import { USER_LOGGED_IN } from '../../constans';

export default (store) => (next) => (action) => {
	const { type, payload, ...rest } = action;

	if(type == USER_LOGGED_IN) {
		const decoded = decode(payload);
		localStorage.setItem('todoJWT', payload);

		if(decoded.confirmed === false) {
			localStorage.setItem('showConfirmationEmail', true)
		}

		next({
			...rest,
			type,
			payload: decoded
		})

	} else {
		next(action);
	}

}