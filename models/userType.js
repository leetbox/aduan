const { Model } = require('objection');

const softDelete = require('objection-soft-delete');

class UserType extends softDelete({ columnName: 'deleted' })(Model) {
  static get tableName() {
    return 'userType';
  }
}

module.exports = UserType;
