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

exports.read = async (input) => {
	const {
		id,
		page,
		limit,
	} = input;

	if (page && page < 1) return Promise.reject(new Error('RULE_PAGE_>_0'));
  if (limit && limit < 1) return Promise.reject(new Error('RULE_LIMIT_>_0'));

  const q = {};
  q.deleted = false;

  if (id) q.id = id;

  const newLimit = parseInt(limit, 10) || pagination.limit;
  const newPage = parseInt(page, 10) - 1 || pagination.page;

  return Complaint
    .query()
    .where(q)
    .eager('[report, reporter, transaction, file, incharge, note]')
    .page(newPage, newLimit)
    .orderBy('id', 'desc')
    .then((rows) => {
      if (isEmpty(rows.results)) return Promise.reject(new Error('COMPLAINT_NOT_FOUND'));

      if (id) return rows.results[0];

      return rows.results;
    });
}

exports.update = async (input) => {
  const { id, category } = input;
  const u = input;

  if (category) u.category = JSON.stringify(category);


  const deleted = false;

  try {
    const row = await transaction(knex, async (trx) => {
      const complaint = await Complaint.query(trx)
        .where({ id, deleted })
        .upsertGraph(u, {
          noRelate: true,
          noDelete: true,
        })
        .eager('[report, reporter, transaction, file, incharge, note]')
        .first()
        .throwIfNotFound();

      return complaint;
    });

    return row;
  } catch (error) {
    if (error instanceof Complaint.NotFoundError) {
      return Promise.reject(new Error('COMPLAINT_NOT_FOUND'));
    }

    return Promise.reject(new Error('UPDATE_COMPLAINT_FAILED'));
  }
};

exports.delete = async (input) => {
  const { id } = input;

  const deleted = false;

  const complaint = Complaint
  	.query()
    .patch({ deleted: true })
    .where({ id, deleted });

  const report = Report
  	.query()
    .patch({ deleted: true })
    .where({ id, complaintId: complaint.id, deleted });

  const reporter = Reporter
  	.query()
    .patch({ deleted: true })
    .where({ id, complaintId: complaint.id, deleted });

  const transaction = Transaction
  	.query()
    .patch({ deleted: true })
    .where({ id, complaintId: complaint.id, deleted });

  const file = File
  	.query()
    .patch({ deleted: true })
    .where({ id, complaintId: complaint.id, deleted });

  const incharge = Incharge
  	.query()
    .patch({ deleted: true })
    .where({ id, complaintId: complaint.id, deleted });

  const note = Note
  	.query()
    .patch({ deleted: true })
    .where({ id, complaintId: complaint.id, deleted });

  await Promise.all([ 
  	report,
  	reporter,
  	transaction,
  	file,
  	incharge,
  	note,
  ]);

  return complaint;
};
