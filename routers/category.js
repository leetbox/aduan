const router = require('express').Router();

const categoryController = require('../controllers/category');

router.post('/', (req, res) => {
	const input = req.body;

	return categoryController
		.create(input)
		.then(data => res.status(200).json(data))
		.catch(error => res.status(400).json({
			error: {
				message: error.message,
			},
		})
	);
});
