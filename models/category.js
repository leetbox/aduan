const { Model } = require('objection');

const softDelete = require('objection-soft-delete');

class Category extends softDelete({ columnName: 'deleted' })(Model) {
  static get tableName() {
    return 'category';
  }
}

module.exports = Category;