const isEmpty = require('is-empty');
const bcrypt = require('bcrypt');

const knex = require('knex')(require('../../knexfile'));
const auth = require('../../libraries/authenticate');

const User = require('../../models/user').bindKnex(knex);
const TokenCtrl = require('../token');

const pagination = require('../../settings/pagination');

exports.create = async (input) => {
	const {
		email,
		ic,
		password,
		phone,
		officerNo,
	} = input;

	const i = input;

	if (!password) return Promise.reject(new Error('MISSING_PASSWORD'));

	const hash = bcrypt.hashSync(password, 10);
	delete i.password;
	i.hash = hash;

	function filter(fun) {
		if (ic) fun.orWhere({ ic });
		if (phone) fun.orWhere({ phone });
		if (officerNo) fun.orWhere({ officerNo });

		return fun;
	}

	const deleted = false;

	const exist = await User
		.query()
		.where({ email, deleted })
		.andWhere(qb => filter(qb))
		.first();

	if (!isEmpty(exist)) return Promise.reject(new Error('USER_EXIST'));

	return User
		.query()
		.insert(i); // mysql don't need first
};
