import React, { Component } from 'react';
import Routes from './Routes';
import TopNavigation from './navigation/TopNavigation';
import { ThemeProvider } from '@rmwc/theme';

const themeOptions = {
	primary: '#303030',
	secondary: '#6200ee'
};

export class App extends Component {
	render() {
		return (
			<ThemeProvider options={themeOptions}>
				<TopNavigation />
				<Routes />
			</ThemeProvider>
		)
	}
}

export default App;
