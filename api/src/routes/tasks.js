const express = require("express");

const Task = require('../models/Task');
const User = require('../models/User');
const authenticate = require('../middlewares/authenticate');
const parseErrors = require('../utils/ParseError');

const router = express.Router();
router.use(authenticate);

router.post("/", (req, res) => {
	const { tasks, tags, family: {admin} } = req.currentUser;
	const { loaded, activeTab, loadingTags } = req.body;
	if(activeTab == 0) {
		const needTasks = tasks.slice(loaded, loaded + 15);
		res.status(200).json({ 
			tasks: needTasks,
			total: tasks.length,
			loaded: needTasks.length,
			tags: loadingTags ? tags : undefined
		});
	} else if(activeTab == 1) {

	}
	
});

router.post("/add", (req, res) => {
	const { task, activeTab } = req.body;
	const user = req.currentUser;

	Task.create({ 
		...task, 
		dateCreate: new Date(), 
		author: activeTab == 1 ? user.username : undefined 
	}).then(task => {
			user.addTask(task, activeTab);
			user.addTag(task.tag);
			user.save(); 
			res.json({ task })
		})
		.catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.post("/edit", (req, res) => {
	const { task, activeTab } = req.body;
	const user = req.currentUser;

	let i;

	User.findOne({ email: user.email }, (err, user) => {
		if(err) res.status(200).json({ errors: parseErrors(err.errors) });
		
		user.tasks[activeTab].forEach(function (item, num) {
			if(item._id == task.id) {
				item.title = task.title;
				item.tag = task.tag;
				item.color = task.color;
				i = num;
				return;
			}
		});

		user.addTag(task.tag);
		user.markModified('tasks');
		user.save()
			.then(() => res.json({ i }))
			.catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
 	});
});

router.post("/success", (req, res) => {
	const { id, activeTab } = req.body;
	const user = req.currentUser;

	User.findOne({ email: user.email }, function(err, user){
		if(err) res.status(200).json({ errors: parseErrors(err.errors) });

		user.tasks[activeTab].forEach(function (item) {
			if(item._id == id) {
				item.success = !item.success;
				item.success ? 
					item.dateCompletion = new Date() : item.dateCompletion = null
				return;
			}
		});

		user.tasks.success = 'changed';
		user.markModified('tasks');
		user.save()
			.then(() => res.json({ }))
			.catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
 });

});

module.exports = router;