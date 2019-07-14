exports.up = async (knex, Promise) => Promise.all([
  knex.schema.createTable('userType', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.boolean('deleted').defaultTo(false);
    table.timestamps(true, true);
  }),
]);

exports.down = async (knex, Promise) => Promise.all([
  knex.schema.dropTable('userType'),
]);
