const isEmpty = require('is-empty');

const knex = require('knex')(require('../../knexfile'));

const Token = require('../../models/token').bindKnex(knex);

exports.create = async (input) => {
	const {
		userId,
		refreshToken,
	} = input;

	const deleted = false;

	const exist = await Token
		.query()
		.where({ refreshToken, deleted })
		.first();

	if (!isEmpty(exist)) return Promise.reject(new Error('TOKEN_EXIST'));

	const i = {
		userId,
		refreshToken,
	};

	return Token
		.query()
		.insert(i); // mysql don't need first
};
