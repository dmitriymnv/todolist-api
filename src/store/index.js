import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools  } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import createRootReducer from '../reducers';
import history from './history';
import token from './middlewares/token';

const enhancer = applyMiddleware(
	thunk,
	routerMiddleware(history),
	token
)

export default createStore(
	createRootReducer(history), 
	composeWithDevTools(enhancer)
)