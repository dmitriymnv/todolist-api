const express = require("express");
const User = require('../models/User');
const authenticate = require('../middlewares/authenticate');
const parseErrors = require('../utils/ParseError');

const router = express.Router();
router.use(authenticate);

router.post("/", (req, res) => {
	const { family } = req.currentUser;
	res.json( family );
});

router.post("/add", (req, res) => {
	const { username: inviteAdmin } = req.currentUser;
	const { family } = req.body;
	let errors = [];

	family.forEach(username => {

		User.findOne({ username }, (err, user) => {
			
			if(user === null) {
				errors.push(`Пользователь ${username} не найден`)
				return;
			};

			const { family } = user;

			if(family.invite) {
				errors.push(`В данный момент нельзя пригласить ${username} в соместную группу`);
			} else {
				family.invite = inviteAdmin;
				user.markModified('family');
				user.save()
			}
			
		})

	});

	setTimeout(() => {

		if(Object.keys(errors).length === 0) {
			res.json({});
		} else {
			res.status(400).json({ errors: { global: errors } })
		}

	}, 1500);
});

module.exports = router;