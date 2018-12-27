const express = require("express");
const authenticate = require('../middlewares/authenticate');
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
			.then(() => res.json({}))
	} else {
		res.status(400).json({ 
			errors: { global: 'Ваш текущий пароль не совпадает с тем который вы указали' } 
		})
	}

})

module.exports = router;