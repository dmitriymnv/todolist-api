const express = require("express");
const User = require('../models/User');
const authenticate = require('../middlewares/authenticate');
const parseErrors = require('../utils/ParseError');
const { sendConfirmationEmail } = require('../mailer');

const router = express.Router();
router.use(authenticate);

router.post("/", (req, res) => {
	const tasks = req.currentUser.tasks;
	if(tasks.length <= 10) {
		res.status(200).json({ tasks, total: tasks.length });
	} else {
		const value = req.body.value;
		const tenTasks = tasks.slice(value, value + 10);
		res.status(200).json({ tasks: tenTasks, value: 10, total: tasks.length });
	}
});

module.exports = router;