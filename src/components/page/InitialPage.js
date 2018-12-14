import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import './css/initialpage';
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';

export class Initialpage extends Component {
	static propTypes = {

	}

	render() {
		return (
			<div className="initialpage center-container">
				<div className="initialpage__bg"></div>
				<h1><Typography use="headline1">Todolist-Api</Typography></h1>
				<Button onClick={() => this.props.push('/signup')} raised>Зарегистрироваться</Button>
			</div>
		)
	}
}

export default connect(null, { push })(Initialpage)
