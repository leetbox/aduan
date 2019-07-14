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
