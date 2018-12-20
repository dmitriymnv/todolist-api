import { TASKS_FETCHED } from '../constans';
import api from './api';

export const tasksFetched = (tasks) => ({
	type: TASKS_FETCHED,
	payload: { tasks }
})

export const taskAdding = (task) => ({
	type: TASKS_ADD,
	payload: { task }
})


export const tasks = (value) => (dispatch) => {
	return (
		api(['/api/tasks', 'POST'], { value }).then(({ tasks }) => {
			dispatch(tasksFetched(tasks))
		})
	)
}

export const addTask = (data) => (dispatch) => {
	return (
		api(['/api/tasks/add', 'POST'], { data }).then(({ task }) => {
			dispatch(taskAdding(task))
		})
	)
}