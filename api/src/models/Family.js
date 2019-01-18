const mongoose = require('mongoose');

const schema = new mongoose.Schema(
	{
		admin: { type: String, required: true },
		listUsers: { type: Array, default: [] },
		inviteUsers: { type: Array, default: [] },
		tasks: { type: Array, default: [] }
	},
  { timestamps: true }
);

schema.methods.addUser = function addUser(user) {
	this.listUsers.unshift(user)
};

schema.methods.addInvite = function addInvite(username) {
	this.inviteUsers.unshift(username)
};

schema.methods.addTask = function addInvite(task) {
	this.tasks.unshift(task)

	this.listUsers = this.listUsers.map(user => {
		if(user.username == task.author) {
			user.numberTasks = user.numberTasks + 1
		}
		return user;
	})
};

schema.methods.successTask = function successTask(id, successAuthor) {
	this.tasks = this.tasks.map(task => {
		if(task._id == id) {
			task.success = !task.success;
			task.dateCompletion = task.dateCompletion ? undefined : new Date();
			task.successAuthor = task.successAuthor ? '' : successAuthor;
		}
		return task;
	})
};

module.exports = mongoose.model("Family", schema);