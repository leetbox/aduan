const jwt = require('jsonwebtoken');
const isEmpty = require('is-empty');

const accessKey =  '3<#a~0-B-0~a#>3'; // hardcoded
const refreshKey = '6--Y^l0-0l^Y--9'; // hardcoded

const TokenCtrl = require('../controllers/token');
const Cookie = require('./cookie');

// TODO: change implementation to RSA SHA256

exports.sign = (userId, type, key, duration) => {
	const token = jwt.sign({
		id: userId,
		type,
	}, key, { expiresIn: duration });

	return token;
}

exports.verify = (token, type) => {
	let ret = null;
	try {
		const key = type === 'access' ? accessKey : refreshKey;
		const data = jwt.verify(token, key);

		ret = data;
	} catch(error) {
		ret = error.message;
	}

	return ret;
}
