exports.up = async (knex, Promise) => Promise.all([
  knex.schema.createTable('transaction', (table) => {
    table.increments('id').primary();
    table.uuid('complaintId', 36).notNullable();
    table.string('status').defaultTo('pending');
    table.string('billId').nullable();
    table.boolean('deleted').defaultTo(false);    
    table.timestamps(true, true);
  }),
]);

exports.down = async (knex, Promise) => Promise.all([
  knex.schema.dropTable('transaction'),
]);
