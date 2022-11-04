exports.up = function(knex) {
  return knex.schema.createTable("pokemons", table => {
    table.integer('id').primary()
    table.string('name')
    table.string('color')
    table.string('type_1')
    table.string('type_2')
    table.boolean('preevolution')
    table.boolean('evolution')
    table.integer('generation')
    table.integer('weight')
    table.integer('height')
    table.string('sprite')
    table.string('image')
  })
};

exports.down = function(knex) {
  knex.schema.dropTable("pokemons")
};
