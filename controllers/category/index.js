const isEmpty = require('is-empty');

const knex = require('knex')(require('../../knexfile'));

const Category = require('../../models/category').bindKnex(knex);

const pagination = require('../../settings/pagination');

exports.create = async (input) => {
	const {
		name
	} = input;

	const i = input;

	const deleted = false;

	const exist = await Category
		.query()
		.where({ name, deleted })
		.first();

	if (!isEmpty(exist)) return Promise.reject(new Error('CATEGORY_EXIST'));

	return Category
		.query()
		.insert(i); // mysql don't need first
};
