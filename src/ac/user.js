import { push } from "connected-react-router";

import api from './api';
import { userLoggedIn } from './auth';

export const signup = (data) => (dispatch) => {
	return (
		api(['/api/user', 'POST'], { data }).then(({ user }) => {
			localStorage.todoJWT = user.token;
			localStorage.showConfirmationEmail = true;
			dispatch(userLoggedIn(user));
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
				localStorage.setItem('todoJWT', res.user.token);
				dispatch(userLoggedIn(res.user));
				dispatch(push('/tasks', { alertText: res.text } ))
			})
	)
}