const express = require("express");

const User = require('../models/User');
const parseErrors = require('../utils/ParseError');
const { sendConfirmationEmail } = require('../mailer');

const router = express.Router();

router.post("/", (req, res) => {	
	const { email, username, password, subNews } = req.body.data;
	const user = new User({ email, username, subNews });
	user.setPassword(password);
	user.setConfirmationToken();
	user.save()
		.then(userRecord => {
			sendConfirmationEmail(userRecord);
			res.json({ token: userRecord.toAuthJSON()})
		})
		.catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

module.exports = router;