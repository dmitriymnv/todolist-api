import { push } from "connected-react-router";

import api from './api';
import decode from 'jwt-decode';
import { userLoggedIn } from './auth';

export const signup = (data) => (dispatch) => {
	return (
		api(['/api/user', 'POST'], { data }).then(({ token }) => {
			const payload = decode(token);
			localStorage.setItem('todoJWT', token);
			localStorage.showConfirmationEmail = true;
			dispatch(userLoggedIn(payload));
			dispatch(push('/tasks'));
		})
	)
}

export const setPassword = (data) => (dispatch) => {
	return (
		api(['/api/profile/setPassword', 'POST'], data)
			.then(res => {
				dispatch(push('/tasks', { alertText: res.text } ))
			})
	)
}

export const setPrivateDate = (data) => (dispatch) => {
	return (
		api(['/api/profile/setPrivateDate', 'POST'], data)
			.then(res => {
				const payload = decode(res.token);
				localStorage.setItem('todoJWT', res.token);
				dispatch(userLoggedIn(payload));
				dispatch(push('/tasks', { alertText: res.text } ))
			})
	)
}