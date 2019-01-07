import api from './api';

export const loadingTasks = (data) => () => {
	return (
		api(['/api/tasks', 'POST'], { data })
	)
}

export const addTask = (data) => () => {
	return (
		api(['/api/tasks/add', 'POST'], { data })
	)
}

export const editTask = (data) => () => {
	return (
		api(['/api/tasks/edit', 'POST'], { data })
	)
}

export const successTask = (data) => () => {
	return (
		api(['/api/tasks/success', 'POST'], { data })
	)
}