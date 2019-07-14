const router = require('express').Router();

const statusController = require('../controllers/status');

router.post('/', (req, res) => {
	const input = req.body;

	return statusController
		.create(input)
		.then(data => res.status(200).json(data))
		.catch(error => res.status(400).json({
			error: {
				message: error.message,
			},
		})
	);
});
