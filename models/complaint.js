const { Model } = require('objection');

const uuid = require('uuid/v4');

const softDelete = require('objection-soft-delete');

class Complaint extends softDelete({ columnName: 'deleted' })(Model) {
  static get tableName() {
    return 'complaint';
  }

  static get relationMappings() {
    return {
      incharge: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/incharge`,
        join: {
          from: 'complaint.id',
          to: 'incharge.complaintId',
        },
      },
      report: {
        relation: Model.HasOneRelation,
        modelClass: `${__dirname}/report`,
        join: {
          from: 'complaint.id',
          to: 'report.complaintId',
        },
      },
      reporter: {
        relation: Model.HasOneRelation,
        modelClass: `${__dirname}/reporter`,
        join: {
          from: 'complaint.id',
          to: 'reporter.complaintId',
        },
      },
      file: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/file`,
        join: {
          from: 'complaint.id',
          to: 'file.complaintId',
        },
      },
      transaction: {
        relation: Model.HasOneRelation,
        modelClass: `${__dirname}/transaction`,
        join: {
          from: 'complaint.id',
          to: 'transaction.complaintId',
        },
      }, 
      note: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/note`,
        join: {
          from: 'complaint.id',
          to: 'note.complaintId',
        },
      },
    };
  }

  $beforeInsert() {
    this.id = uuid();
  }
}

module.exports = Complaint;
