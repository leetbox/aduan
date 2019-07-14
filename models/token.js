const { Model } = require('objection');

const softDelete = require('objection-soft-delete');

class Token extends softDelete({ columnName: 'deleted' })(Model) {
  static get tableName() {
    return 'token';
  }

  // TODO: do we need relationship?
}

module.exports = Token;