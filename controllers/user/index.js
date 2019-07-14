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

exports.read = async (input) => {
	const {
		id,
		page,
		email,
		hash,
		limit,
	} = input;

	if (page && page < 1) return Promise.reject(new Error('RULE_PAGE_>_0'));
  if (limit && limit < 1) return Promise.reject(new Error('RULE_LIMIT_>_0'));

  const q = {};
  q.deleted = false;

  if (id) q.id = id;
  if (email) q.email = email;
  if (hash) q.hash = hash;

  const newLimit = parseInt(limit, 10) || pagination.limit;
  const newPage = parseInt(page, 10) - 1 || pagination.page;

  return User
    .query()
    .where(q)
    .page(newPage, newLimit)
    .orderBy('id', 'desc')
    .then((rows) => {
      if (isEmpty(rows.results)) return Promise.reject(new Error('USER_NOT_FOUND'));

      if (id) return rows.results[0];

      return rows.results;
    });
}
