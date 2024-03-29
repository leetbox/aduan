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

router.post('/logout', (req, res) => {
	const input = req.body;

	return userController
		.logout(input.userId, input.refreshToken)
		.then(data => res.status(200).json(data))
		.catch(error => res.status(400).json({
			error: {
				message: error.message,
			},
		})
	);
});

router.post('/', (req, res) => {
	const input = req.body;

	return userController
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

	return userController
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

	return userController
		.update(input)
		.then(data => res.status(200).json(data))
		.catch(error => res.status(400).json({
			error: {
				message: error.message,
			},
		})
	);
});

router.delete('/:id', (req, res) => {
	const input = {};
	input.id = req.params.id;

	return userController
		.delete(input)
		.then(data => res.sendStatus(204))
		.catch(error => res.status(400).json({
			error: {
				message: error.message,
			},
		})
	);
});

module.exports = router;