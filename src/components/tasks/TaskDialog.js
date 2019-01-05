import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent } from '@rmwc/dialog';

const AddTaskForm = lazy(() => import('../forms/AddTaskForm'));
const EditTaskForm = lazy(() => import('../forms/EditTaskForm'));

const TaskDialog = ({ dialog: { open, purpose }, tags, onSubmit, onClose }) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
		>  
			{purpose &&
				<DialogContent>
					{purpose == 'add' ? 
						<AddTaskForm 
							submit={onSubmit} 
							tags={tags}
						/> :
						<EditTaskForm
							task={ tasks[activeTab][numberTask] }
							tags={tags}
							submit={onSubmit} 
						/>
					}
				</DialogContent>
			}
		</Dialog>
	)
}

TaskDialog.propTypes = {
	dialog: PropTypes.shape({
		open: PropTypes.bool.isRequired,
		purpose: PropTypes.string
	}).isRequired,
	tags: PropTypes.array.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
}

export default TaskDialog
