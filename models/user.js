const { Model } = require('objection');

const uuid = require('uuid/v4');

const softDelete = require('objection-soft-delete');

class User extends softDelete({ columnName: 'deleted' })(Model) {
  static get tableName() {
    return 'user';
  }

  static get relationMappings() {
    return {
      note: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/note`,
        join: {
          from: 'user.id',
          to: 'note.userId',
        },
      },
      incharge: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/incharge`,
        join: {
          from: 'user.id',
          to: 'incharge.userId',
        },
      },
    };
  }

  $beforeInsert() {
    this.id = uuid();
  }
}

module.exports = User;
