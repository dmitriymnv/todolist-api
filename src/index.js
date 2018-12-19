import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store from './store';
import history from './store/history';
import App from './components/App';
import './other/css/main.sass';
import decode from 'jwt-decode';
import { userLoggedIn } from './ac/auth';

const token = localStorage.getItem('todoJWT');

if(token) {
	const payload = decode(token);
	const user = { 
		token: localStorage.todoJWT,
		email: payload.email, 
		username: payload.username, 
		confirmed: payload.confirmed 
	};
	store.dispatch(userLoggedIn(user));
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