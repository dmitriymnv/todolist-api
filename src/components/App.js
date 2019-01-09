import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@rmwc/theme';
import { connect } from 'react-redux';

import Routes from './routes';
import TopNavigation from './navigation';
import { loadingFamily } from '../ac/family';

const themeOptions = {
	primary: '#303030',
	secondary: '#6200ee'
}

export class App extends Component {

	static propTypes = {
		token: PropTypes.bool,
		loadingFamily: PropTypes.func.isRequired,
	}

	componentDidMount() {
		const { token, loadingFamily } = this.props; 
		if(token) {
			loadingFamily();
		}
	}

	render() {
		return (
			<ThemeProvider options={themeOptions}>
				<TopNavigation />
				<div className="routes container-fluid">
					<Routes />
				</div>
			</ThemeProvider>
		)
	}
}

function mapStateToProps(state) {
	return {
		token: !!state.user.token
	}
}

export default connect(mapStateToProps, { loadingFamily })(App)