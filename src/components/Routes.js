import React, { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import Loader from './loader';
import AuthRoute from './routes/AuthRoute';

const InitialPage = lazy(() => import('./page/InitialPage'));
const SignupPage = lazy(() => import('./page/SignupPage'));
const TasksPage = lazy(() => import('./page/TasksPage'));

const Routes = () => { 
	return (
		<Suspense fallback={<Loader />}>
			<Switch>
				<AuthRoute path="/" to="/tasks" exact component={ InitialPage } />
				<AuthRoute path="/signup" to="tasks" exact component={ SignupPage } />
				<AuthRoute path="/tasks" to="/signup" user exact component={ TasksPage } />
			</Switch>
		</Suspense>
	)
}

export default Routes
