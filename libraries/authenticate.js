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

exports.createRefreshToken = (userId, type) => {
	return this.sign(userId, type, refreshKey, (15 * 60));
}

exports.createAccessToken = (userId, type) => {
	return this.sign(userId, type, accessKey, (1 * 5));
}

exports.verifyAccessToken = (token) => {
	const verify = this.verify(token, 'access');

	// 401
	if (verify !== 'jwt expired' && !verify.id) {
		return false;
	}

	return verify;
}

exports.renewAccessToken = async (refreshToken) => {
	const verify = this.verify(refreshToken, refreshKey);

	// 401 require relogin
	if (verify !== 'jwt expired' && !verify.id) {
		return false;
	}

	// check if exist in db
	const token = await TokenCtrl.read({ userId: verify.id, refreshToken })
		.then(data => data)
		.catch(err => err);

	if (isEmpty(token)) return false;

	// return new access token if refresh token is in db
	return this.createAccessToken(verify.id, verify.type);
}
