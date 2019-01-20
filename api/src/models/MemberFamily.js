const mongoose = require('mongoose');

const schema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		successTasks: { type: Number, default: 0 },
		numberTasks: { type: Number, default: 0 }
	},
  { timestamps: true }
);

module.exports = mongoose.model("MemberFamily", schema);