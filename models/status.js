const { Model } = require('objection');

const softDelete = require('objection-soft-delete');

class Status extends softDelete({ columnName: 'deleted' })(Model) {
  static get tableName() {
    return 'status';
  }
}

module.exports = Status;