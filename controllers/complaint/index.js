const isEmpty = require('is-empty');
const { transaction } = require('objection');

const knex = require('knex')(require('../../knexfile'));

const Complaint = require('../../models/complaint').bindKnex(knex);
const Report = require('../../models/report').bindKnex(knex);
const Reporter = require('../../models/reporter').bindKnex(knex);
const Transaction = require('../../models/transaction').bindKnex(knex);
const File = require('../../models/file').bindKnex(knex);
const Incharge = require('../../models/incharge').bindKnex(knex);
const Note = require('../../models/note').bindKnex(knex);

const pagination = require('../../settings/pagination');

exports.create = async (input) => {
  const { category } = input;
  const i = input;

  if (category) i.category = JSON.stringify(category);

  try {
    const row = await transaction(knex, async (trx) => {
      const complaint = await Complaint.query(trx)
        .insertGraph(i)
        .eager('[report, reporter, transaction, file, incharge, note]');

      return complaint;
    });

    return row;
  } catch (error) {
    return Promise.reject(new Error('CREATE_COMPLAINT_FAILED'));
  }
};
