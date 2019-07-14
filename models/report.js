const { Model } = require('objection');

const softDelete = require('objection-soft-delete');

class Report extends softDelete({ columnName: 'deleted' })(Model) {
  static get tableName() {
    return 'report';
  }

  static get relationMappings() {
    return {
      complaint: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/complaint`,
        join: {
          from: 'report.complaintId',
          to: 'complaint.id',
        },
      },
    };
  }
}

module.exports = Report;
