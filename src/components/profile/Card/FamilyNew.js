import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@rmwc/button';
import { CardActionButtons } from '@rmwc/card';
import { ListDivider } from '@rmwc/list';
import { Typography } from '@rmwc/typography';

import { responseJoinFamily } from '../../../ac/family';

class FamilyNew extends Component {
	render() {
		const { dialogOpen, invite, JoinMemberFamily } = this.props;
		return (
			<div className="card__item__body">
			
				<div className="card__item__list">
					<Typography use="headline6" tag="div">
						Вы не состоите в семейной группе
					</Typography>
						
					
					<CardActionButtons className="card__item__buttons">
						<Button onClick={dialogOpen}>Создать группу</Button>
					</CardActionButtons>
				</div>
				
				{invite &&
					<>
						<ListDivider />
						<div className="card__item__list">

							<Typography
								className="form__item__title"
								use="subtitle2"
								tag="div"
							>
								Приглашение на вступление в группу от {invite}
							</Typography>

							<CardActionButtons className="card__item__buttons item__buttons">
								<Button onClick={() => JoinMemberFamily(true)}>Вступить</Button>
								<Button onClick={() => JoinMemberFamily(false)}>Отклонить</Button>
							</CardActionButtons>
						</div>
					</>
				}
			</div>
		)
	}
}

FamilyNew.propTypes = {
	dialogOpen: PropTypes.func.isRequired,
	responseJoinFamily: PropTypes.func.isRequired,
	loaderPage: PropTypes.func.isRequired,
	JoinMemberFamily: PropTypes.func.isRequired,
	invite: PropTypes.string
}

export default connect(null, { responseJoinFamily })(FamilyNew)
