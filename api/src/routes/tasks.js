const express = require("express");

const Task = require('../models/Task');
const User = require('../models/User');
const Family = require('../models/Family');
const authenticate = require('../middlewares/authenticate');
const parseErrors = require('../utils/ParseError');

const router = express.Router();
router.use(authenticate);

router.post("/", (req, res) => {
	const { tasks, tags, family: { admin } } = req.currentUser;
	const { loaded, activeTab, loadingTags } = req.body;

	let needTasks;
	let lengthTasks;

	if(activeTab == 0) {
		needTasks = tasks.slice(loaded, loaded + 15);
		lengthTasks = tasks.length;
	} else if(activeTab == 1) {
		Family.findOne({ admin }, (err, family) => {
			if(family) {
				needTasks = family.tasks.slice(loaded, loaded + 15);
				lengthTasks = family.tasks.length;
			}
		})
	}

	setTimeout(() => {
		res.status(200).json({ 
			tasks: needTasks,
			total: lengthTasks,
			loaded: needTasks.length,
			tags: loadingTags ? tags : undefined
		});
	}, 1500);

});

router.post("/add", (req, res) => {
	const { task, activeTab } = req.body;
	const currentUser = req.currentUser;

	Task.create({ 
		...task, 
		dateCreate: new Date(), 
		author: activeTab == 1 ? currentUser.username : undefined 
	}).then(task => {
			if(activeTab == 0) {
				currentUser.addTask(task);
				currentUser.save();
			} else if(activeTab == 1) {
				Family.findOne({ admin: currentUser.family.admin }, (err, family) => {
					if(family) {
						family.addTask(task);
						family.markModified('listUsers');
						family.save();
					}
				})
			}
			res.json({ task })
		})
		.catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.post("/edit", (req, res) => {
	const { task, activeTab } = req.body;
	const user = req.currentUser;

	let i;

	let success;

	if(activeTab == 0) {
		user.editTask(task);
		user.markModified('tasks');
		user.save((error, success) => {
			if(success) {
				success = true;
			} else {
				success = false;
			}
		});
	} else if(activeTab == 1) {
		Family.findOne({ admin: user.family.admin }, (err, family) => {
			if(family) {
				family.editTask(task, user.username);
				family.markModified('tasks');
				family.save((error, success) => {
					if(success) {
						success = true;
					} else {
						success = false;
					}
				});
			}
		})
	}

	setTimeout(() => {
		if(success) {
			res.json({ })
		} else {
			res.status(400).json({ })
		}
	}, 1500);
});

router.post("/success", (req, res) => {
	const { id, activeTab } = req.body;
	const user = req.currentUser;

	if(activeTab == 0) {
		user.successTask(id);
		user.markModified('tasks');
		user.save()
			.then(() => res.json({ }))
			.catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
	} else if(activeTab == 1) {
		Family.findOne({ admin: user.family.admin }, (err, family) => {
			if(family) {
				family.successTask(id, user.username)
				family.markModified('tasks');
				family.save()
					.then(() => res.json({ }))
					.catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
			}
		})
	}

});

module.exports = router;