const { Model } = require('objection');

const softDelete = require('objection-soft-delete');

class Note extends softDelete({ columnName: 'deleted' })(Model) {
  static get tableName() {
    return 'note';
  }

  static get relationMappings() {
    return {
      complaint: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/complaint`,
        join: {
          from: 'note.complaintId',
          to: 'complaint.id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/user`,
        join: {
          from: 'note.userId',
          to: 'user.id',
        },
      },
    };
  }
}

module.exports = Note;
