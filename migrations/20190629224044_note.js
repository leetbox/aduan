exports.up = async (knex, Promise) => Promise.all([
  knex.schema.createTable('note', (table) => {
    table.increments('id').primary();
    table.uuid('complaintId', 36).notNullable();    
    table.uuid('userId', 36).notNullable();
    table.string('message').notNullable();
    table.boolean('deleted').defaultTo(false);    
    table.timestamps(true, true);
  }),
]);

exports.down = async (knex, Promise) => Promise.all([
  knex.schema.dropTable('note'),
]);
