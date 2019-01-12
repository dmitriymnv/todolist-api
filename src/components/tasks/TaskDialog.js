import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent } from '@rmwc/dialog';

const AddTaskForm = lazy(() => import('../forms/AddTaskForm'));
const EditTaskForm = lazy(() => import('../forms/EditTaskForm'));

const TaskDialog = ({ task, dialogOpen, tags, onSubmit, onClose }) => {
	return (
		<Dialog
			open={dialogOpen}
			onClose={onClose}
		>  
			
				<DialogContent>
					{task ? 
						<EditTaskForm
							task={task}
							tags={tags}
							submit={onSubmit} 
						/>
						 :
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
	// dialog: PropTypes.shape({
	// 	open: PropTypes.bool.isRequired,
	// 	purpose: PropTypes.string
	// }).isRequired,
	// tags: PropTypes.array.isRequired,
	// onSubmit: PropTypes.func.isRequired,
	// onClose: PropTypes.func.isRequired,
}

export default TaskDialog
