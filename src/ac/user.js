import api from "./api";
import { userLoggedIn } from "./auth";
import { push } from "connected-react-router";

export const signup = (data) => (dispatch) => {
	return (
		api(['/api/users', 'POST'], { data }).then(({ user }) => {
			localStorage.todoJWT = user.token;
			dispatch(userLoggedIn(user));
			dispatch(push('/tasks'));
		})
	)
}