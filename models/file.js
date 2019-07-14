const { Model } = require('objection');

const softDelete = require('objection-soft-delete');

class File extends softDelete({ columnName: 'deleted' })(Model) {
  static get tableName() {
    return 'file';
  }

  static get relationMappings() {
    return {
      complaint: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/complaint`,
        join: {
          from: 'file.complaintId',
          to: 'complaint.id',
        },
      },
    };
  }
}

module.exports = File;
