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

exports.read = async (input) => {
	const {
		id,
		name,
		page,
		limit,
	} = input;

	if (page && page < 1) return Promise.reject(new Error('RULE_PAGE_>_0'));
  if (limit && limit < 1) return Promise.reject(new Error('RULE_LIMIT_>_0'));

  const q = {};
  q.deleted = false;

  if (id) q.id = id;
  if (name) q.name = name;

  const newLimit = parseInt(limit, 10) || pagination.limit;
  const newPage = parseInt(page, 10) - 1 || pagination.page;

  return Branch
    .query()
    .where(q)
    .page(newPage, newLimit)
    .orderBy('id', 'desc')
    .then((rows) => {
      if (isEmpty(rows.results)) return Promise.reject(new Error('BRANCH_NOT_FOUND'));

      if (id) return rows.results[0];

      return rows.results;
    });
}

exports.update = async (input) => {
	const {
		id,
		name,
	} = input;

	const u = input;

	const deleted = false;

	const exist = await Branch
		.query()
		.whereNot({ id, deleted })
		.andWhere({ name })
		.first();

	if (!isEmpty(exist)) return Promise.reject(new Error('BRANCH_EXIST'));

	return Branch
		.query()
		.where({ id, deleted })
		.patch(u);
};
