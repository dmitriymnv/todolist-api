import { USER_LOGGED_IN } from "../constans";

const initialState = {
}

export default (state = initialState, { type, payload }) => {
	switch (type) {

	case USER_LOGGED_IN:
		return { ...state, ...payload.user };

	default:
		return state
	}
}
