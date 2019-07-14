const { Model } = require('objection');

const softDelete = require('objection-soft-delete');

class Branch extends softDelete({ columnName: 'deleted' })(Model) {
  static get tableName() {
    return 'branch';
  }
}

module.exports = Branch;