import { push } from "connected-react-router";

import api from "./api";
import { userLoggedIn } from "./auth";

export const signup = (data) => (dispatch) => {
	return (
		api(['/api/users', 'POST'], { data }).then(({ user }) => {
			localStorage.todoJWT = user.token;
			localStorage.showConfirmationEmail = true;
			dispatch(userLoggedIn(user));
			dispatch(push('/tasks'));
		})
	)
}