const router = require('express').Router();
const request = require('../../libraries/request');
const host = require('../../settings/host');
const Cookie = require('../../libraries/cookie');

router.post('/login', async (req, res) => {
	const {
		email,
		password,
	} = req.body;

	const login = await request({
	  method: 'post',
	  url: `/api/user/login`,
	  data: {
	    email,
	    password,
	  },
	})
	.catch(err => ({
		status: err.response.status,
	}));

	if (parseInt(login.status) !== 200) {
		res.redirect('/masuk?flash=true');
		return;
	}

	Cookie.setCookie(res, {
		accessToken: login.data.accessToken,
		refreshToken: login.data.refreshToken,
	})

	res.redirect('/utama');
});
