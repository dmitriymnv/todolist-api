import api from './api';

export const loadingTasks = (start) => () => {
	return (
		api(['/api/tasks', 'POST'], { start })
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

export const successTask = (id) => () => {
	return (
		api(['/api/tasks/success', 'POST'], { id })
	)
}