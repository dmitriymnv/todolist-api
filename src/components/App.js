import React, { Component } from 'react';
import Routes from './routes';
import TopNavigation from './navigation';
import { ThemeProvider } from '@rmwc/theme';

const themeOptions = {
	primary: '#303030',
	secondary: '#6200ee'
}

export class App extends Component {
	render() {
		return (
			<ThemeProvider options={themeOptions}>
				<TopNavigation />
				<div className="routes container-fluid flex-container">
					<Routes />
				</div>
			</ThemeProvider>
		)
	}
}

export default App