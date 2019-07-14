const isEmpty = require('is-empty');

const knex = require('knex')(require('../../knexfile'));

const Branch = require('../../models/branch').bindKnex(knex);

const pagination = require('../../settings/pagination');

exports.create = async (input) => {
	const {
		name
	} = input;

	const i = input;

	const deleted = false;

	const exist = await Branch
		.query()
		.where({ name, deleted })
		.first();

	if (!isEmpty(exist)) return Promise.reject(new Error('BRANCH_EXIST'));

	return Branch
		.query()
		.insert(i); // mysql don't need first
};
