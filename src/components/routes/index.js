import React, { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom'

import Loader from '../loader';
import AuthRoute from './AuthRoute';
const InitialPage = lazy(() => import('../page/InitialPage'));
const SignupPage = lazy(() => import('../page/SignupPage'));
const TasksPage = lazy(() => import('../page/TasksPage'));
const ConfirmationPage = lazy(() => import('../page/ConfirmationPage'));
const ProfilePage = lazy(() => import('../page/ProfilePage'));
const PasswordPage = lazy(() => import('../page/PasswordPage'));
const PrivateDatePage = lazy(() => import('../page/PrivateDatePage'));

const Routes = () => { 
	return (
		<Suspense fallback={<Loader />}>
			<Switch>
				<AuthRoute path="/" to="/tasks" exact component={ InitialPage } />
				<AuthRoute path="/signup" to="tasks" exact component={ SignupPage } />
				<AuthRoute path="/tasks" to="/signup" user exact component={ TasksPage } />
				<AuthRoute path="/profile" to="/signup" user exact component={ ProfilePage } />
				<AuthRoute path="/profile/password" to="/signup" user exact component={ PasswordPage } />
				<AuthRoute path="/profile/private-date" to="/signup" user exact component={ PrivateDatePage } />
				<Route path="/confirmation/:token" exact component={ ConfirmationPage } />
			</Switch>
		</Suspense>
	)
}

export default Routes
