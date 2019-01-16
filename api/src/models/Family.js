const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");

const MemberFamily = require('../models/MemberFamily');

const schema = new mongoose.Schema(
	{
		admin: { type: String, required: true },
		listUsers: { type: Array, default: [] },
		inviteUsers: { type: Array, default: [] },
		tasks: { type: Array, default: [] }
	},
  { timestamps: true }
);

schema.methods.addUser = function addUser(username) {
	this.listUsers.unshift(username);
};

schema.methods.addInvite = function addInvite(username) {
	this.inviteUsers.unshift(username)
};

module.exports = mongoose.model("Family", schema);