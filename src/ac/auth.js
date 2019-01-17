import { push } from 'connected-react-router';

import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../constans";

import api from './api';

export const userLoggedIn = (token) => ({
	type: USER_LOGGED_IN,
	payload: token
})

export const userLoggedOut = () => ({
	type: USER_LOGGED_OUT
})

export const login = (data) => (dispatch) => {
	return (
		api(['/api/auth', 'POST'], data).then(({ token }) => {
			dispatch(userLoggedIn(token));
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
		api(['/api/auth/confirmation', 'POST'], { token }).then(({ token }) => {
			localStorage.removeItem('showConfirmationEmail');
			dispatch(userLoggedIn(token));
		})
	)
}