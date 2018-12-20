const express = require("express");
const Task = require('../models/Task');
const authenticate = require('../middlewares/authenticate');
const parseErrors = require('../utils/ParseError');

const router = express.Router();
router.use(authenticate);

router.post("/", (req, res) => {
	const tasks = req.currentUser.tasks;
	if(tasks.length <= 10) {
		res.status(200).json({ tasks, total: tasks.length });
	} else {
		const value = req.body.value;
		const tenTasks = tasks.slice(value, value + 10);
		res.status(200).json({ tasks: tenTasks, total: tasks.length });
	}
});

router.post("/add", (req, res) => {
	const { data } = req.body;
	const user = req.currentUser;

	Task.create({ ...data, dateCreate: new Date() })
		.then(task => {
			user.addTask(task)
			user.save();
			res.json({ task })
		})
		.catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));

});

module.exports = router;