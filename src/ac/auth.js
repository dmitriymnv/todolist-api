import { push } from 'connected-react-router';

import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../constans";
import decode from 'jwt-decode';
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
		api(['/api/auth', 'POST'], data).then(({ token }) => {
			const payload = decode(token);
			localStorage.setItem('todoJWT', token);
			if(payload.confirmed === false) localStorage.setItem('showConfirmationEmail', true);
			dispatch(userLoggedIn(payload));
			dispatch(push('/tasks'));
		})
	)
}

export const logout = () => (dispatch) => {
	localStorage.clear();
	dispatch(userLoggedOut());
	dispatch(push('/'));
}

export const confirm = (token) => () => {
	return (
		api(['/api/auth/confirmation', 'POST'], token).then(({ user }) => {
			localStorage.todoJWT = user.token;
			localStorage.removeItem('showConfirmationEmail');
			dispatch(userLoggedIn(user));
		})
	)
}