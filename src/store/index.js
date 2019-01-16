import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools  } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import createRootReducer from '../reducers';
import history from './history';
import family from './middlewares/family';

const enhancer = applyMiddleware(
	thunk,
	routerMiddleware(history),
	family
)

export default createStore(
	createRootReducer(history), 
	composeWithDevTools(enhancer)
)