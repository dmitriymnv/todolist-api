const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	title: { type: String, required: true },
	color: { type: String },
	success: { type: Boolean, default: false },
	dateCreate: { type: Date, required: true },
	dateCompletion: { type: Date },
	tag: { type: String }
})

module.exports = mongoose.model("Book", schema)