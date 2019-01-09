import React from 'react';
import { Button } from '@rmwc/button';
import { CardActionButtons } from '@rmwc/card';
import { ListDivider } from '@rmwc/list';
import { Typography } from '@rmwc/typography';

const FamilyNew = () => {
	return (
		<>
			<Typography className="card__item__title" use="subtitle1" tag="div">
				Семейные задачи
			</Typography>

			<ListDivider />

			<div className="card__item__body">
				<Typography use="headline6" tag="div">
					Вы не состоите в семейной группе
				</Typography>
					
				
				<CardActionButtons className="card__item__buttons">
					<Button onClick={() => push('/profile/private-date')}>Создать группу</Button>
				</CardActionButtons>
					
			</div>
		</>
	)
}

export default FamilyNew
