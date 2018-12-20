import { TASKS_FETCHED } from "../constans";

const initialState = {

}

export default (state = initialState, { type, payload }) => {
	switch (type) {

	case TASKS_FETCHED:
	
		return { ...state, ...payload.tasks }

	default:
		return state
	}
}
