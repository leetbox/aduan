const isEmpty = require('is-empty');

const knex = require('knex')(require('../../knexfile'));

const UserType = require('../../models/userType').bindKnex(knex);

const pagination = require('../../settings/pagination');

exports.create = async (input) => {
	const {
		name
	} = input;

	const i = input;

	const deleted = false;

	const exist = await UserType
		.query()
		.where({ name, deleted })
		.first();

	if (!isEmpty(exist)) return Promise.reject(new Error('USER_TYPE_EXIST'));

	return UserType
		.query()
		.insert(i); // mysql don't need first
};
