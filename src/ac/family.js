import api from './api';
import { userLoggedIn } from './auth';

export const addNewFamilyMembers = (list) => () => {
	return (
		api(['/api/family/add', 'POST'], list)
	)
}

export const responseJoinFamily = (entry) => (dispatch) => {
	return (
		api(['/api/family/joinfamily', 'POST'], { entry })
			.then(({ token, family }) => {
				dispatch(userLoggedIn(token))
				return family;
			})
	)
}