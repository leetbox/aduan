const { Model } = require('objection');

const softDelete = require('objection-soft-delete');

class Reporter extends softDelete({ columnName: 'deleted' })(Model) {
  static get tableName() {
    return 'reporter';
  }

  static get relationMappings() {
    return {
      complaint: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/complaint`,
        join: {
          from: 'reporter.complaintId',
          to: 'complaint.id',
        },
      },
    };
  }
}

module.exports = Reporter;
