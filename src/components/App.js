import React, { Component } from 'react';
import Routes from './Routes';
import TopNavigation from './navigation/TopNavigation';

export class App extends Component {
	render() {
		return (
			<>
				<TopNavigation />
				<Routes />
			</>
		)
	}
}

export default App;
