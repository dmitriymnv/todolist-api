import React, { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import Loader from './loader';
import AuthRoute from './routes/AuthRoute';

const TasksPage = lazy(() => import('./page/TasksPage'));
const InitialPage = lazy(() => import('./page/InitialPage'));
const SignupPage = lazy(() => import('./page/SignupPage'));

const Routes = () => { 
	return (
		<Suspense fallback={<Loader />}>
			<Switch>
				<AuthRoute path="/" to="/tasks" exact component={ InitialPage } />
				<AuthRoute path="/tasks" to="/signup" user exact component={ TasksPage } />
				<AuthRoute path="/signup" to="tasks" exact component={ SignupPage } />
			</Switch>
		</Suspense>
	)
}

export default Routes
