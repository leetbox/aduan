const isEmpty = require('is-empty');

const knex = require('knex')(require('../../knexfile'));

const Status = require('../../models/status').bindKnex(knex);

const pagination = require('../../settings/pagination');

exports.create = async (input) => {
	const {
		name
	} = input;

	const i = input;

	const deleted = false;

	const exist = await Status
		.query()
		.where({ name, deleted })
		.first();

	if (!isEmpty(exist)) return Promise.reject(new Error('STATUS_EXIST'));

	return Status
		.query()
		.insert(i); // mysql don't need first
};
