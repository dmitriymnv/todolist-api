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
			localStorage.todoJWT = user.token;
			if(!user.confirmed) localStorage.showConfirmationEmail = true;
			dispatch(userLoggedIn(user));
			dispatch(push('/tasks'));
		})
	)
}

export const logout = () => (dispatch) => {
	localStorage.removeItem('todoJWT');
	dispatch(userLoggedOut());
	dispatch(push('/'));
}