const express = require("express");
const authenticate = require('../middlewares/authenticate');
const parseErrors = require('../utils/ParseError');
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

const router = express.Router();
router.use(authenticate);

router.post("/setPassword", (req, res) => {
	const { currentUser } = req;
	const { data } = req.body;

	if(currentUser.isValidPassword(data.oldPassword)) {
		currentUser.setPassword(data.newPassword)
		currentUser.save()
			.then(() => res.json({ text: 'Вы успешно изменили cвой пароль!' }))
	} else {
		res.status(400).json({ 
			errors: { global: 'Ваш текущий пароль не совпадает с тем который вы указали' } 
		})
	}

})

router.post("/setPrivateDate", (req, res) => {
	const { currentUser } = req;
	const { data } = req.body;
	
	currentUser.setPrivateDate(data)
	currentUser.save()
		.then(() => res.json({ 
			user: currentUser.toAuthJSON(), 
			text: 'Вы успешно изменили свои личные данные!'
		}))
		.catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));

})

module.exports = router;