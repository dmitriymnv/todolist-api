import React from 'react';
import PropTypes from 'prop-types';
import { TabBar, Tab } from '@rmwc/tabs';

const TableHead = ({ activeTab, onActivateTab }) => {
	return (
		<thead>
			<tr>
				<th>
					<TabBar
						activeTabIndex={activeTab}
						onActivate={evt => onActivateTab(evt.detail.index)}
					>
						<Tab>Личные</Tab>
						<Tab>Семейные</Tab>
					</TabBar>
				</th>
			</tr>
			<tr>
				<th>Выполнение</th>
				<th className="task-tables__title">Задача</th>
				<th>Дата создания</th>
				<th>Дата выполнения</th>
			</tr>
		</thead>
	)
}

TableHead.propTypes = {
	activeTab: PropTypes.number.isRequired,
	onActivateTab: PropTypes.func.isRequired
}

export default TableHead
