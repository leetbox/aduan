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

  return UserType
    .query()
    .where(q)
    .page(newPage, newLimit)
    .orderBy('id', 'desc')
    .then((rows) => {
      if (isEmpty(rows.results)) return Promise.reject(new Error('USER_TYPE_NOT_FOUND'));

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

	const exist = await UserType
		.query()
		.whereNot({ id, deleted })
		.andWhere({ name })
		.first();

	if (!isEmpty(exist)) return Promise.reject(new Error('USER_TYPE_EXIST'));

	return UserType
		.query()
		.where({ id, deleted })
		.patch(u);
};

exports.delete = async (input) => {
  const { id } = input;
  const deleted = false;

  return UserType
  	.query()
    .where({ id, deleted })
    .delete();
};
