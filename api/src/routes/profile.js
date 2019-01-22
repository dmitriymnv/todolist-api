const express = require("express");

const authenticate = require('../middlewares/authenticate');
const parseErrors = require('../utils/ParseError');
const Family = require('../models/Family');

const router = express.Router();
router.use(authenticate);

router.post("/", (req, res) => {
	const { family: familyUser, tasks } = req.currentUser;
	let payload = {};

	if(!familyUser.admin && familyUser.invite) {
		payload.family = { invite: familyUser.invite };
	} else if(familyUser.admin) {
		Family.findOne({ admin: familyUser.admin }, (err, family) => {
			payload.family = {
				admin: family.admin,
				inviteUsers: family.inviteUsers,
				listUsers: family.listUsers,
				admin: family.admin,
				invite: familyUser.invite
			}
		})
	}

	payload.user = {
		tasks: {
			length: tasks.length,
			success: tasks.reduce((sum, task) => {
				return sum + +task.success;
			}, 0)
		}
	};

	setTimeout(() => {
		res.json(payload)
	}, 1500);

})

router.post("/setPassword", (req, res) => {
	const user = req.currentUser;
	const { oldPassword, newPassword } = req.body;

	if(user.isValidPassword(oldPassword)) {
		user.setPassword(newPassword)
		user.save()
			.then(() => res.json({ text: 'Вы успешно изменили cвой пароль!' }))
	} else {
		res.status(400).json({ 
			errors: { global: 'Ваш текущий пароль не совпадает с тем который вы указали' } 
		})
	}

})

router.post("/setPrivateDate", (req, res) => {
	const user = req.currentUser;
	const data = req.body;
	
	user.setPrivateDate(data)
	user.save()
		.then(() => res.json({ 
			token: user.toAuthJSON(), 
			text: 'Вы успешно изменили свои личные данные!'
		}))
		.catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));

})

module.exports = router;