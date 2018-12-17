import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../constans";

const initialState = {
}

export default (state = initialState, { type, payload }) => {
	switch (type) {

	case USER_LOGGED_IN:
		return { ...payload.user };
	
	case USER_LOGGED_OUT:
		return { ...initialState };

	default:
		return state
	}
}
