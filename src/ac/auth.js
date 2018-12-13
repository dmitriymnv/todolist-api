import { USER_LOGGED_IN } from "../constans";
import api from './api';
import { push } from 'connected-react-router';

export const userLoggedIn = user => ({
	type: USER_LOGGED_IN,
	payload: { user }
});

export const login = data => dispatch => {
	return api(['/api/auth', 'POST'], { data }).then(({ user }) => {
		localStorage.todoJWT = user.token;
		dispatch(userLoggedIn(user))
		dispatch(push('/home'))
	})
};