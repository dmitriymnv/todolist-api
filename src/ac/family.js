import { USER_LOADED_FAMILY } from '../constans';
import api from './api';

export const userLoadedFamily = (family) => ({
	type: USER_LOADED_FAMILY,
	payload: family
})

export const loadingFamily = () => (dispatch) => {
	return (
		api(['/api/family', 'POST'])
			.then(family => dispatch(userLoadedFamily(family)))
	)
}