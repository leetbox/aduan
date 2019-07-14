const router = require('express').Router();

const complaintController = require('../controllers/complaint');

router.post('/', (req, res) => {
	const input = req.body;

	return complaintController
		.create(input)
		.then(data => res.status(200).json(data))
		.catch(error => res.status(400).json({
			error: {
				message: error.message,
			},
		})
	);
});

router.get('/', (req, res) => {
	const input = req.query;

	return complaintController
		.read(input)
		.then(data => res.status(200).json(data))
		.catch(error => res.status(400).json({
			error: {
				message: error.message,
			},
		})
	);
});

router.patch('/:id', (req, res) => {
	const input = req.body;
	input.id = req.params.id;

	return complaintController
		.update(input)
		.then(data => res.status(200).json(data))
		.catch(error => res.status(400).json({
			error: {
				message: error.message,
			},
		})
	);
});
