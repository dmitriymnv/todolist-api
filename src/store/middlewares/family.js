import { USER_LOGGED_IN, USER_LOADED_FAMILY } from '../../constans';

export default (store) => (next) => (action) => {
	const { type, payload } = action;

	next(action);

	if(type == USER_LOGGED_IN) {
		next({
			type: USER_LOADED_FAMILY,
			payload: payload.family
		})
	}
}