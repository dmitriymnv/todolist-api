import { USER_LOADED_FAMILY, ADD_NEW_FAMILY_MEMBERS } from '../constans';
import api from './api';

export const userLoadedFamily = (family) => ({
	type: USER_LOADED_FAMILY,
	payload: family
})

export const userAddMembersFamily = (members) => ({
	type: ADD_NEW_FAMILY_MEMBERS,
	payload: members
})

export const loadingFamily = () => (dispatch) => {
	return (
		api(['/api/family', 'POST'])
			.then(family => dispatch(userLoadedFamily(family)))
	)
}

export const addNewFamilyMembers = (list) => () => {
	return (
		api(['/api/family/add', 'POST'], list)
	)
}

export const responseJoinFamily = (entry) => (dispatch) => {
	return (
		api(['/api/family/joinfamily', 'POST'], { entry })
			.then((res) => dispatch( userLoadedFamily(res) ))
	)
}