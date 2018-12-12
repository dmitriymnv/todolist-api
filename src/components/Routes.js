import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import Loader from './loader';

const HomePage = lazy(() => import('./page/Homepage'));

const Routes = () => {
	return (
		<div className="routes container-fluid">
		<Suspense fallback={<Loader />}>
			<Route path="/" component={ HomePage }></Route>
		</Suspense>
		</div>
	)
}

export default Routes
