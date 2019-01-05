import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';

import './css/initialpage';
import { title } from '../../constans';

export class Initialpage extends Component {
	static propTypes = {
		push: PropTypes.func.isRequired
	}

	componentWillMount() {
		document.title = 'Главная страница' + title;
	}

	render() {
		return (
			<div className="initial-page flex-container">
				<div className="initial-page__background"></div>
				<Typography
					tag="h1"
					className="initial-page__title"
					use="headline1"
				> 
					Todolist-Api
				</Typography>
				<Button onClick={() => this.props.push('/signup')} raised>Зарегистрироваться</Button>
			</div>
		)
	}
}

export default connect(null, { push })(Initialpage)
