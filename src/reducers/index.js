import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import user from './user';
import tasks from './tasks';

export default (history) => combineReducers({
  router: connectRouter(history),
	user,
	tasks
})