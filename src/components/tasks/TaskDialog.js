import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent } from '@rmwc/dialog';

const AddTaskForm = lazy(() => import('../forms/AddTaskForm'));
const EditTaskForm = lazy(() => import('../forms/EditTaskForm'));

const TaskDialog = ({ task, dialog: { open, purpose }, tags, onSubmit, onClose }) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
		>  
			
				<DialogContent>
					{purpose === 'edit' && 
						<EditTaskForm
							task={task}
							tags={tags}
							submit={onSubmit} 
						/>
					}
					{purpose === 'add' &&
						<AddTaskForm 
							submit={onSubmit} 
							tags={tags}
					 />
					}
				</DialogContent>
			
		</Dialog>
	)
}

TaskDialog.propTypes = {
	task: PropTypes.object,
	dialog: PropTypes.shape({
		open: PropTypes.bool.isRequired,
		purpose: PropTypes.string,
	}).isRequired,
	tags: PropTypes.arrayOf(
		PropTypes.string
	).isRequired,
	onSubmit: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
}

export default TaskDialog
