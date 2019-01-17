import { hot } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import decode from 'jwt-decode';

import store from './store';
import history from './store/history';
import App from './components/App';
import './other/css/main';
import { userLoggedIn } from './ac/auth';

const token = localStorage.getItem('todoJWT');

if(token) {
	store.dispatch(userLoggedIn(token, false));
};

const renderDOM = (() => 
	render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
		</Provider>, 
		document.getElementById('app')
	) 
)();

export default hot(module)(renderDOM);