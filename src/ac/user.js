import { push } from "connected-react-router";

import api from './api';
import { userLoggedIn } from './auth';

export const signup = (data) => (dispatch) => {
	return (
		api(['/api/user', 'POST'], { data })
			.then(({ token }) => {
				localStorage.showConfirmationEmail = true;
				dispatch(userLoggedIn(token));
				dispatch(push('/tasks'));
			})
	)
}

export const loadingProfile = () => () => {
	return (
		api(['/api/profile', 'POST'])
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
			.then(({ token, text }) => {
				dispatch(userLoggedIn(token));
				dispatch(push('/tasks', { alertText: text } ))
			})
	)
}