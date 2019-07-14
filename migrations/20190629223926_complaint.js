exports.up = async (knex, Promise) => Promise.all([
  knex.schema.createTable('complaint', (table) => {
    table.uuid('id', 36).primary();
    table.string('branch').notNullable();
    table.string('status').notNullable();
    table.json('category').notNullable();
    table.boolean('deleted').defaultTo(false);
    table.timestamps(true, true);
  }),
]);

exports.down = async (knex, Promise) => Promise.all([
  knex.schema.dropTable('complaint'),
]);
