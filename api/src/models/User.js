const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true
		},
		username: { 
			type: String, 
			required: true, 
			unique: true
		},
		passwordHash: { type: String, required: true },
		confirmed: { type: Boolean, default: false },
		subNews: { type: Boolean, default: true },
		tasks: { type: Array, default: [] },
		confirmationToken: { type: String },
		tags: { type: Array, default: [] },
		family: {
			admin: { type: String, default: '' },
			invite: { type: String, default: '' }
		}
	},
	
  { timestamps: true }
);

schema.methods.editTask = function editTask(editTask) {
  this.tasks = this.tasks.map(task => {
		if(task._id == editTask.id) {
			task.title = editTask.title;
			task.color = editTask.color;
			task.tag = editTask.tag;
		}
		return task;
	})
};

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.addFamilyAdmin = function addFamilyAdmin(username) {
	this.family.admin = username;
};

schema.methods.addTask = function addTask(task) {
	this.tasks.unshift(task);
};

schema.methods.successTask = function addTask(id) {
	this.tasks = this.tasks.map(task => {
		if(task._id == id) {
			task.success = !task.success;
			task.dateCompletion = task.dateCompletion ? undefined : new Date();
		}
		return task;
	})
};

schema.methods.addTag = function addTag(tag) {
	let tags = this.tags;
	if(tag.length > 0 && tags.indexOf(tag) == -1) tags.unshift(tag);
};

schema.methods.addInviteFamily = function addInviteFamily(username) {
	this.family.invite = username;
};

schema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

schema.methods.setSubNews = function setSubNews(value) {
  this.subNews = value; 
};

schema.methods.setPrivateDate = function setPrivateDate(data) {
	const { email, username } = data;
  if(email) this.email = email;
  if(username) this.username = username;
};

schema.methods.setConfirmationToken = function setConfirmationToken() {
  this.confirmationToken = this.generateJWT()
};

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
	return `${process.env.HOST}/confirmation/${this.confirmationToken}`
}

schema.methods.fieldCheck = function fieldCheck(field) {
	if(!field) {
		return field;
	}
	return;
}

schema.methods.toAuthJSON = function toAuthJSON() {
	return jwt.sign(
    {
			email: this.email,
			username: this.username,
			confirmed: this.fieldCheck(this.confirmed),
			family: this.family
    },
		process.env.JWT_SECRET
  );
};

schema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
	return `${process.env.HOST}/reset_password/${this.generateResetPasswordToken()}`
};

schema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};


schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
			email: this.email,
			username: this.username,
			confirmed: this.fieldCheck(this.confirmed)
    },
		process.env.JWT_SECRET
  );
};

schema.methods.setPassword = function setPassword(password) {
	this.passwordHash = bcrypt.hashSync(password, 10);	
}

schema.plugin(uniqueValidator, { message: 'Invalid {TYPE}'});

module.exports = mongoose.model("User", schema);