const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const mail = require('../mailer');

const router = express.Router();

router.post("/", (req, res) => {
	const { data } = req.body;

  User.findOne({ email: data.email }).then(user => {
    if (user && user.isValidPassword(data.password)) {			
      res.json({ user: user.toAuthJSON() });
    } else {
      res.status(400).json({ errors: { global: "Неправильный пароль или аккаунта не существует" } });
    }
  });
});

module.exports = router;