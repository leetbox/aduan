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

exports.update = async (input) => {
	const {
		id,
		ic,
		phone,
		email,
		userType,
		picture,
		oldPassword,
		newPassword,
		verified,
	} = input;

	const u = input;

	function filter(fun) {
		if (ic) fun.orWhere({ ic });
		if (phone) fun.orWhere({ phone });
		if (email) fun.orWhere({ email });

		return fun;
	}

	const deleted = false;

	let password = null;

	const existing = await User
		.query()
		.findOne({ id });

	if (isEmpty(existing)) return Promise.reject(new Error('USER_NOT_FOUND'));

	if (newPassword && oldPassword && bcrypt.compareSync(oldPassword, existing.hash)) {
		u.hash = bcrypt.hashSync(newPassword, 10);
	}

	delete u.newPassword;
	delete u.oldPassword;

	const exist = await User
		.query()
		.whereNot({ id, deleted })
		.andWhere(qb => filter(qb))
		.first();

	if (!isEmpty(exist)) return Promise.reject(new Error('USER_EXIST'));

	return User
		.query()
		.where({ id, deleted })
		.patch(u);
};

exports.delete = async (input) => {
  const { id } = input;
  const deleted = false;

  return User
  	.query()
    .where({ id, deleted })
    .delete();
};

exports.login = async (email, password) => {
	// user exist?
	const user = await this.read({ email })
		.then(data => data[0])
		.catch(err => err);

	if (isEmpty(user) || user instanceof Error) return Promise.reject(new Error('USER_NOT_FOUND'));

	const hash = bcrypt.compareSync(password, user.hash);

	if (!hash) return Promise.reject(new Error('INVALID_PASSWORD'));
	
	// create access and refresh token
	const refreshToken = auth.createRefreshToken(user.id, user.userType);
	const accessToken = auth.createAccessToken(user.id, user.userType);

	// store refresh token in token table for session validation
	const token = await TokenCtrl.create({ userId: user.id, refreshToken })
		.then(data => data)
		.catch(err => err);
	
	if (isEmpty(token) || token instanceof Error) return Promise.reject(new Error('CREATE_TOKEN_FAILED'));

	// return refresh token and access token
	return ({
		refreshToken,
		accessToken,
	});
}
