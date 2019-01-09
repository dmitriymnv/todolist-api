const express = require("express");
const authenticate = require('../middlewares/authenticate');
const parseErrors = require('../utils/ParseError');

const router = express.Router();
router.use(authenticate);

router.post("/", (req, res) => {
	const { family } = req.currentUser;
	res.json(family);
});

module.exports = router;