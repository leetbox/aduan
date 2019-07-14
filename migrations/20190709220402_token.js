exports.up = async (knex, Promise) => Promise.all([
  knex.schema.createTable('token', (table) => {
    table.increments('id').primary();
    table.uuid('userId').notNullable();
    table.text('refreshToken').notNullable();
    table.boolean('deleted').defaultTo(false);
    table.timestamps(true, true);
  }),
]);

exports.down = async (knex, Promise) => Promise.all([
  knex.schema.dropTable('token'),
]);
