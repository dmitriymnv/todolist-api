const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/", (req, res) => {
	const { data } = req.body;

  User.findOne({ email: data.email }).then(user => {
		console.log(user);
		
    if (user && user.isValidPassword(data.password)) {			
      res.json({ user: user.toAuthJSON() });
    } else {
      res.status(400).json({ errors: { global: "Неправильный пароль или аккаунта не существует" } });
    }
  });
});

router.post("/confirmation", (req, res) => {
	const { token } = req.body;

	User.findOneAndUpdate(
		{ confirmationToken: token, confirmed: false }, 
		{ confirmationToken: "", confirmed: true }, 
		{ new: true }
	).then(user => 
		user ? res.json({ user: user.toAuthJSON() }) : res.status(400).json({})
	)

})

module.exports = router;