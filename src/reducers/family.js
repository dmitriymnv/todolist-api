import { USER_LOADED_FAMILY } from '../constans';

const initialState = {
	admin: false,
	list: []
}

export default (state = initialState, { type, payload }) => {
	switch (type) {

	case USER_LOADED_FAMILY:
		return { ...state, ...payload }

	default:
		return state
	}
}
