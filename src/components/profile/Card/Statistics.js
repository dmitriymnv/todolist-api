import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from '@rmwc/card';
import { ListDivider } from '@rmwc/list';
import { Typography } from '@rmwc/typography';
import ChartistGraph from 'react-chartist';

const Statistics = ({ tasks = {} }) => {
	return (
		<Card className="card__item card__item_statistics" outlined>
			<Typography className="card__item__title" use="subtitle1" tag="div">
				Статистика
			</Typography>

			<ListDivider />

			<div className="card__item__body">
				<div className="card__item__list">
					<ChartistGraph
						type='Bar'
						options={{
							width: '550px'
						}}
						data={{
							labels: [`Всего задач\n(${tasks.length})`, `Выполнено задач\n(${tasks.success})`, `Предстоит выполнить задач\n(${tasks.length - tasks.success})`],
							series: [
								[tasks.length, tasks.success, tasks.length - tasks.success]
							]
						}}
  				/>
				</div>
			</div>

		</Card>
	)
}

Statistics.propTypes = {
	tasks: PropTypes.object.isRequired
}


export default connect()(Statistics)
