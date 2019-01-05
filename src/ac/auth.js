import { push } from 'connected-react-router';

import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../constans";
import api from './api';

export const userLoggedIn = (user) => ({
	type: USER_LOGGED_IN,
	payload: { user }
})

export const userLoggedOut = () => ({
	type: USER_LOGGED_OUT
})

export const login = (data) => (dispatch) => {
	return (
		api(['/api/auth', 'POST'], { data }).then(({ user }) => {
			localStorage.setItem('todoJWT', user.token);
			if(user.confirmed === false) localStorage.setItem('showConfirmationEmail', true);
			dispatch(userLoggedIn(user));
			dispatch(push('/tasks'));
		})
	)
}

export const logout = () => (dispatch) => {
	localStorage.clear();
	dispatch(userLoggedOut());
	dispatch(push('/'));
}

export const confirm = (token) => (dispatch) => {
	return (
		api(['/api/auth/confirmation', 'POST'], { token }).then(({ user }) => {
			localStorage.todoJWT = user.token;
			localStorage.removeItem('showConfirmationEmail');
			dispatch(userLoggedIn(user));
		})
	)
}

export const setPassword = (data) => (dispatch) => {
	return (
		api(['/api/profile/setPassword', 'POST'], { data })
			.then(res => {
				dispatch(push('/tasks', { alertText: res.text } ))
			})
	)
}

export const setPrivateDate = (data) => (dispatch) => {
	return (
		api(['/api/profile/setPrivateDate', 'POST'], { data })
			.then(res => {
				localStorage.setItem('todoJWT', res.user.token);
				dispatch(userLoggedIn(res.user));
				dispatch(push('/tasks', { alertText: res.text } ))
			})
	)
}