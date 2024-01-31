
exports.up = knex => {
  return knex.schema.createTable('users', table => {
    table.increments("id");
    table.string('name');
    table.string('email').unique();
    table.string('password');
    table.string('avatar').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}


exports.down = knex => knex.schema.dropTable('users')
