const { Model } = require('objection');

const softDelete = require('objection-soft-delete');

class Transaction extends softDelete({ columnName: 'deleted' })(Model) {
  static get tableName() {
    return 'transaction';
  }

  static get relationMappings() {
    return {
      complaint: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/complaint`,
        join: {
          from: 'transaction.complaintId',
          to: 'complaint.id',
        },
      },
    };
  }
}

module.exports = Transaction;
