import { ADD_MEMBER_FAMILY } from '../constans';

const initialState = {}

export default (state = initialState, { type, payload }) => {
	switch (type) {

	case ADD_MEMBER_FAMILY:
		return { ...payload, ...state }

	default:
		return state
	}
}
