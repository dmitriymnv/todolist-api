import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools  } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createRootReducer from '../reducers';
import history from './history';

const enhancer = applyMiddleware(
	thunk
);

export default createStore(
	createRootReducer(history), 
	composeWithDevTools(enhancer)
);