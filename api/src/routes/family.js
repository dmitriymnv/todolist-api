const express = require("express");

const User = require('../models/User');
const Family = require('../models/Family');
const MemberFamily = require('../models/MemberFamily');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();
router.use(authenticate);

router.post("/add", (req, res) => {
	const { username: currentUsername } = req.currentUser;
	const list = req.body;
	let errors = [];
	let inviteUsers = [];

	list.forEach(username => {
		
		User.findOne({ username }, (err, user) => {
				
			if(user === null) {
				errors.push(`Пользователь ${username} не найден`);
				return;
			}

			if(user.family.adminFamily || user.family.invite) {
				errors.push(`В данный момент нельзя пригласить ${username} в соместную группу`);
				return;
			}

			user.addInviteFamily(currentUsername);
			user.save();

			inviteUsers.push(username);

		});

	});

	Family.findOne({ admin: currentUsername }, (err, family) => {
		if(family) {
			family.addInvite(inviteUsers);
		}
	})

	setTimeout(() => {
		if(Object.keys(errors).length == 0) {
			res.json({})
		} else {
			res.status(404).json({ errors: { global: errors } })
		}
	}, 2000);

});

router.post("/joinfamily", (req, res) => {
	const user = req.currentUser;
	const { family: { invite }, username } = user;
	const { entry } = req.body;
	let resFamily;
	
	if(entry) {
		user.addFamilyAdmin(invite);

		Family.findOne({ admin: invite }, (err, family) => {

			if(family) {
				MemberFamily.create({ username, inviteDate: new Date()})
					.then((user) => {
						family.addUser(user);
						family.markModified('listUsers');
						family.save();
					})
				resFamily = family;
			} else {
				const newFamily = new Family({ admin: invite })
				MemberFamily.create({ username })
					.then((user) => {
						newFamily.addUser(user)
						newFamily.markModified('listUsers');
						newFamily.save();
					})
				User.findOne({ username: invite }, (err, user) => {
					if(user) {	
						user.addFamilyAdmin(invite);
						user.markModified('family');
						user.save()
					}
				})

				resFamily = newFamily;

			}
		})
	} else {
		user.addInviteFamily('');
		user.addFamilyAdmin('');
	}

	user.markModified('family');
	user.save()
		.then(() => {
			setTimeout(() => {
				res.json({
					family: resFamily ? resFamily : user.family,
					token: user.toAuthJSON()
				})
			}, 1500);
		})
	
});

module.exports = router;