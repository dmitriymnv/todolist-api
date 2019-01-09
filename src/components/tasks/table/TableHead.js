import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TabBar, Tab } from '@rmwc/tabs';

const TableHead = ({ activeTab, onActivateTab, familyList }) => {
	return (
		<thead className="task-table__head">
			{familyList &&
				<tr>
					<th className="task-table__select-tab">
						<TabBar
							activeTabIndex={activeTab}
							onActivate={evt => onActivateTab(evt.detail.index)}
						>
							<Tab>Личные</Tab>
							<Tab>Семейные</Tab>
						</TabBar>
					</th>
				</tr>
			}
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
	onActivateTab: PropTypes.func.isRequired,
	familyList: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
	return {
		familyList: !!state.family.list[0]
	}
}

export default connect(mapStateToProps)(TableHead)
