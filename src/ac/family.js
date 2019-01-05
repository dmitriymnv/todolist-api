import { ADD_MEMBER_FAMILY } from '../constans';
import api from './api';

export const addMemberFamily = (family) => ({
	type: ADD_MEMBER_FAMILY,
	payload: family
})

export const loadingMemberFamily = () => (dispatch) => {
	return (
		api(['/api/family', 'POST'])
			.then( family => dispatch(addMemberFamily(family)) )
	)
}