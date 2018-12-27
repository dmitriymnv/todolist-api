import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../constans";
import api from './api';
import { push } from 'connected-react-router';

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

export const resetPassword = (data) => (dispatch) => {
	return (
		api(['/api/auth/resetPassword', 'POST'], { data }).then(({ user }) => {
			console.log(user)
		})
	)
}