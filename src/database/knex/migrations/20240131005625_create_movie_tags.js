exports.up = knex => {
  return knex.schema.createTable('movie_tags', table => {
    table.increments("id");
    table.string('name');
    table.integer('user_id')
      .references('user_id')
      .inTable('movie_notes')
    table.integer('note_id')
      .references('id') 
      .inTable('movie_notes')
      .onDelete('CASCADE')
  })
}

exports.down = knex => knex.schema.dropTable('movie_tags')