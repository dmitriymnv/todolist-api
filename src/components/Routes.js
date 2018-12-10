import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

const HomePage = lazy(() => import('./page/Homepage'));

const Routes = () => {
	return (
		<div className="routes container-fluid">
		<Suspense fallback={<div>Loading</div>}>
			<Route path="/" component={ HomePage }></Route>
		</Suspense>
		</div>
	)
}

export default Routes
