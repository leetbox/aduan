exports.up = async (knex, Promise) => Promise.all([
  knex.schema.table('transaction', (table) => {
    table.decimal('amount', 11, 2).notNullable();
  }),
]);

exports.down = async (knex, Promise) => Promise.all([
  knex.schema.table('transaction', (table) => {
    table.dropColumn('amount');
  }),
]);
