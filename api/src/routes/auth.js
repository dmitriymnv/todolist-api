const express = require("express");

const User = require("../models/User");

const router = express.Router();

router.post("/", (req, res) => {
	const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (user && user.isValidPassword(password)) {			
      res.json({ user: user.toAuthJSON() });
    } else {
      res.status(400).json({ errors: { global: "Неправильный пароль или аккаунта не существует" } });
    }
  });
});

router.post("/confirmation", (req, res) => {
	const token = req.body;

	User.findOneAndUpdate(
		{ confirmationToken: token, confirmed: false }, 
		{ confirmationToken: "", confirmed: true }, 
		{ new: true }
	).then(user => 
		user ? res.json({ user: user.toAuthJSON() }) : res.status(400).json({})
	)

})

module.exports = router;