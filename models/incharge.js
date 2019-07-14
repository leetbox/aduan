const { Model } = require('objection');

const softDelete = require('objection-soft-delete');

class Incharge extends softDelete({ columnName: 'deleted' })(Model) {
  static get tableName() {
    return 'incharge';
  }

  static get relationMappings() {
    return {
      complaint: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/complaint`,
        join: {
          from: 'incharge.complaintId',
          to: 'complaint.id',
        },
      },
    };
  }
}

module.exports = Incharge;
