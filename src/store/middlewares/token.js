import decode from 'jwt-decode';

import { USER_LOGGED_IN } from '../../constans';

export default (store) => (next) => (action) => {
	const { type, payload, ...rest } = action;
	console.log(action)

	if(type == USER_LOGGED_IN) {
		const decoded = decode(payload);
		localStorage.setItem('todoJWT', payload);

		next({
			...rest,
			type,
			payload: decoded
		})

		if(rest.confirmed === true) {
			localStorage.setItem('showConfirmationEmail', true)
		}
	} else {
		next(action);
	}

}