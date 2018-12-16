const express = require("express");
const authenticate = require('../middlewares/authenticate');
const request = require('request-promise');
const { parseString } = require('xml2js');
const Book = require('../models/Book');
const parseErrors = require('../utils/ParseError');

const router = express.Router();
router.use(authenticate);

router.post('/', (req, res) => {
	Book.create({ ...req.body.book, userId: req.currentUser._id })
		.then(book => res.json({ book }))
		.catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
})

router.get('/', (req, res) => {
	Book.find({ userId: req.currentUser._id }).then(books => res.json({ books }));
})

router.get("/search", (req, res) => {
	
	request.get(`https://www.goodreads.com/search/index.xml?key=6pXBVHhKOqu79Ms0EYRMQ&q=${req.query.q}`)
	.then(result =>
		parseString(result, (err, goodreadsResult) => 
			res.json({ books: goodreadsResult.GoodreadsResponse.search[0].results[0].work.map(
				work => ({
					goodreadsId: work.best_book[0].id[0]._,
					title: work.best_book[0].title[0],
					authors: work.best_book[0].author[0].name[0],
					covers: [ work.best_book[0].image_url[0] ]
				})
			)})
		)
	)
	
});

router.get("/fetchPages", (req, res) => {
	
	const goodreadsId = req.query.goodreadsId;

	request
		.get(`https://www.goodreads.com/book/show.xml?key=6pXBVHhKOqu79Ms0EYRMQ&id=
			${goodreadsId}`
		)
		.then(result =>
			parseString(result, (err, goodreadsResult) => {
				const numPages = goodreadsResult.GoodreadsResponse.book[0].num_pages[0];
				const pages = numPages ? parseInt(numPages, 10) : 0;
				res.json({ pages });
			})
		)
	
});

module.exports = router;