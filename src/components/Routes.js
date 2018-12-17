import React, { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import Loader from './loader';
import { Route } from 'react-router-dom'
import AuthRoute from './routes/AuthRoute';

const InitialPage = lazy(() => import('./page/InitialPage'));
const SignupPage = lazy(() => import('./page/SignupPage'));
const TasksPage = lazy(() => import('./page/TasksPage'));
const ConfirmationPage = lazy(() => import('./page/ConfirmationPage'));

const Routes = () => { 
	return (
		<Suspense fallback={<Loader />}>
			<Switch>
				<AuthRoute path="/" to="/tasks" exact component={ InitialPage } />
				<AuthRoute path="/signup" to="tasks" exact component={ SignupPage } />
				<AuthRoute path="/tasks" to="/signup" user exact component={ TasksPage } />
				<Route path="/confirmation/:token" exact component={ ConfirmationPage } />
			</Switch>
		</Suspense>
	)
}

export default Routes
