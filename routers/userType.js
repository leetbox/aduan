const router = require('express').Router();

const userTypeController = require('../controllers/userType/index');

router.post('/', (req, res) => {
	const input = req.body;

	userTypeController
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

	userTypeController
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

	userTypeController
		.update(input)
		.then(data => res.status(200).json(data))
		.catch(error => res.status(400).json({
			error: {
				message: error.message,
			},
		})
	);
});
