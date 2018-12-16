const express = require("express");
const User = require('../models/User');
const parseErrors = require('../utils/ParseError');
const { sendConfirmationEmail } = require('../mailer');

const router = express.Router();

router.post("/", (req, res) => {	
	const { email, username, password } = req.body.data;
	const user = new User({ email, username });
	user.setPassword(password);
	user.setConfirmationToken();
	user.save()
		.then(userRecord => {
			sendConfirmationEmail(userRecord);
			res.json({ user: userRecord.toAuthJSON()})
		})
		.catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

module.exports = router;