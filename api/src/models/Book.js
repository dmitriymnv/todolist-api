const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	title: { type: String, required: true },
	authors: { type: String, required: true },
	cover: { type: String, required: true },
	goodreadsId: { type: String },
	pages: { type: Number, required: true },
	userId: { type: mongoose.Schema.Types.ObjectId, required: true },
})

module.exports = mongoose.model("Book", schema)