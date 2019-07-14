const router = require('express').Router();

const userController = require('../controllers/user');

router.post('/login', async (req, res) => {
	const input = req.body;

	return userController
		.login(input.email, input.password)
		.then(data => res.status(200).json(data))
		.catch(error => res.status(400).json({
			error: {
				message: error.message,
			},
		})
	);
});
