const router = require('express').Router();

const branchController = require('../controllers/branch');

router.post('/', (req, res) => {
	const input = req.body;

	return branchController
		.create(input)
		.then(data => res.status(200).json(data))
		.catch(error => res.status(400).json({
			error: {
				message: error.message,
			},
		})
	);
});
