const express = require("express");
const Task = require('../models/Task');
const User = require('../models/User');
const authenticate = require('../middlewares/authenticate');
const parseErrors = require('../utils/ParseError');

const router = express.Router();
router.use(authenticate);

router.post("/", (req, res) => {
	const tasks = req.currentUser.tasks;

	if(tasks.length <= 10) {
		res.json({ tasks, total: tasks.length})
	} else {
		const { start } = req.body;
		const needTasks = tasks.slice(start, start + 15);
		res.status(200).json({ tasks: needTasks, value: needTasks.length, total: tasks.length });
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

router.post("/success", (req, res) => {
	const { id } = req.body;
	const user = req.currentUser;

	User.findOne({ email: user.email }, function(err, user){
		if(err) res.status(200).json({ errors: parseErrors(err.errors) });
		
		user.tasks.forEach(function (item) {
			if(item._id == id) {
				item.success = !item.success;
				item.success ? 
					item.dateCompletion = new Date() : item.dateCompletion = ''
				return;
			}
		});

		user.tasks.success = 'changed';
		user.markModified('tasks');
		user.save()
			.then(() => res.json({ }))
			.catch((err) => console.log(err))
 });

});

module.exports = router;