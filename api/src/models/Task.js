const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	title: { type: String, required: true },
	color: { type: String, default: '' },
	success: { type: Boolean, default: false },
	dateCreate: { type: String, required: true },
	dateCompletion: { type: String, default: '' },
})

module.exports = mongoose.model("Book", schema)