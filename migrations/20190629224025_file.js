exports.up = async (knex, Promise) => Promise.all([
  knex.schema.createTable('file', (table) => {
    table.increments('id').primary();
    table.uuid('complaintId', 36).notNullable();
    table.string('path').notNullable();
    table.boolean('deleted').defaultTo(false);    
    table.timestamps(true, true);
  }),
]);

exports.down = async (knex, Promise) => Promise.all([
  knex.schema.dropTable('file'),
]);
