import api from './api';

export const loadingTasks = (value) => (dispatch) => {
	return (
		api(['/api/tasks', 'POST'], { value })
	)
}

export const addTask = (data) => (dispatch) => {
	return (
		api(['/api/tasks/add', 'POST'], { data })
	)
}