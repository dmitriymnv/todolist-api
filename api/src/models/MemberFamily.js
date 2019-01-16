const mongoose = require('mongoose');

const schema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		inviteDate: { type: Date, required: true },
		numberTasks: { type: Number, default: 0 }
	},
  { timestamps: true }
);

module.exports = mongoose.model("MemberFamily", schema);