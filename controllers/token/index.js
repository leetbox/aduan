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

exports.read = async (input) => {
	const {
		userId,
		refreshToken,
	} = input;

	const deleted = false;

	const q = {
		userId,
		refreshToken,
		deleted,
	}

  return Token
    .query()
    .where(q)
    .then((rows) => {
      if (isEmpty(rows[0])) return Promise.reject(new Error('TOKEN_NOT_FOUND'));

      return rows[0];
    });
}

exports.delete = async (input) => {
  const { userId, refreshToken } = input;
  const deleted = false;

  return Token
  	.query()
    .where({ userId, refreshToken, deleted })
    .delete();
};
