const express = require("express");

const authenticate = require('../middlewares/authenticate');
const parseErrors = require('../utils/ParseError');

const router = express.Router();
router.use(authenticate);

router.post("/setPassword", (req, res) => {
	const user = req.currentUser;
	const { oldPassword, newPassword } = req.body;

	if(user.isValidPassword(oldPassword)) {
		user.setPassword(newPassword)
		user.save()
			.then(() => res.json({ text: 'Вы успешно изменили cвой пароль!' }))
	} else {
		res.status(400).json({ 
			errors: { global: 'Ваш текущий пароль не совпадает с тем который вы указали' } 
		})
	}

})

router.post("/setPrivateDate", (req, res) => {
	const user = req.currentUser;
	const data = req.body;
	
	user.setPrivateDate(data)
	user.save()
		.then(() => res.json({ 
			user: user.toAuthJSON(), 
			text: 'Вы успешно изменили свои личные данные!'
		}))
		.catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));

})

module.exports = router;