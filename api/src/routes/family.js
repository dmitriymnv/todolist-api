const express = require("express");
const User = require('../models/User');
const Family = require('../models/Family');
const authenticate = require('../middlewares/authenticate');
const parseErrors = require('../utils/ParseError');

const router = express.Router();
router.use(authenticate);

router.post("/", (req, res) => {
	const { family } = req.currentUser;
	res.json( family );
});

router.post("/add", (req, res) => {
	const { family, username: currentUsername } = req.currentUser;
	const { list } = req.body;
	let errors = [];

	if(family.adminFamily == currentUsername) {
		
		Family.findOne({ admin: currentUsername }, (err, dbFamily) => {

			list.forEach(username => {
				
				User.findOne({ username }, (err, user) => {
				
					if(user === null) {
						errors.push(`Пользователь ${username} не найден`);
						return;
					}
	
					if(user.family.invite) {
						errors.push(`В данный момент нельзя пригласить ${username} в соместную группу`);
						return;
					}
	
					user.addInviteFamily(currentUsername);
					user.save();

					dbFamily.addUser(user);
					
				})

			});

			setTimeout(() => {
				user.markModified('listUsers');
				user.save()
					.then(() => res.json({ errors }))
					.catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
			}, 1500);

		})

	} else if(family.adminFamily == '') {
		let createFamily;

		list.forEach(username => {
			
			User.findOne({ username }, (err, user) => {
				
				if(user === null) {
					errors.push(`Пользователь ${username} не найден`);
					return;
				}

				if(user.family.invite) {
					errors.push(`В данный момент нельзя пригласить ${username} в соместную группу`);
					return;
				}

				if(!createFamily) {
					createFamily = new Family({ admin: currentUsername });
				}

				user.addInviteFamily(currentUsername);
				user.save();

				createFamily.addUser(user.username);
				
			})

		});

		setTimeout(() => {
			if(createFamily) {
				createFamily.markModified('listUsers');
				createFamily.save()
			};

			res.json({ errors })
		}, 1500);

	}

});

// router.post("/joinfamily", (req, res) => {
// 	const user = req.currentUser;
// 	const { entry } = req.body;
	
// 	Family.create()
// 		.then(family => family.save())
	
// });

module.exports = router;