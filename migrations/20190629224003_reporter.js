exports.up = async (knex, Promise) => Promise.all([
  knex.schema.createTable('reporter', (table) => {
    table.increments('id').primary();
    table.uuid('complaintId', 36).notNullable();
    table.string('name').notNullable();
    table.string('identity').notNullable();
    table.string('phone').nullable();
    table.string('email').nullable();
    table.string('dob').nullable();
    table.string('gender').nullable();
    table.string('race').nullable();
    table.string('address1').nullable();
    table.string('address2').nullable();
    table.string('postcode', 5).nullable();
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.string('country').defaultTo('Malaysia');
    table.boolean('deleted').defaultTo(false);    
    table.timestamps(true, true);
  }),
]);

exports.down = async (knex, Promise) => Promise.all([
  knex.schema.dropTable('reporter'),
]);
