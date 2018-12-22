import api from './api';

export const loadingTasks = (value) => () => {
	return (
		api(['/api/tasks', 'POST'], { value })
	)
}

export const addTask = (data) => () => {
	return (
		api(['/api/tasks/add', 'POST'], { data })
	)
}

export const successTask = (id) => () => {
	return (
		api(['/api/tasks/success', 'POST'], { id })
	)
}