const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = (req, res, next) => {
	const token = req.headers.authorization;

	if(token !== "null") {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if(err) {
				res.status(401).json({ errors: { global: 'Invalid token'} });
			} else {
				User.findOne({ email: decoded.email }).then(user => {
					req.currentUser = user;
					next();
				})
			}
		})
	} else {
		res.status(401).json({ errors: { global: "No token"}})
	}
}

module.exports = authenticate;