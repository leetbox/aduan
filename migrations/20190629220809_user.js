exports.up = async (knex, Promise) => Promise.all([
  knex.schema.createTable('user', (table) => {
    table.uuid('id', 36).primary();
    table.string('name').notNullable();
    table.string('ic', 14).notNullable();
    table.string('phone', 15).nullable();
    table.string('email').notNullable();
    table.string('officerNo').nullable();
    table.string('userType').notNullable();
    table.string('picture').defaultTo('default.png');
    table.string('hash');
    table.boolean('verified').defaultTo(false);
    table.boolean('deleted').defaultTo(false);
    table.timestamps(true, true);
  }),
]);

exports.down = async (knex, Promise) => Promise.all([
  knex.schema.dropTable('user'),
]);
