exports.up = async function(knex) {
  await knex.schema.table('pokemons', table => {
    table.dropColumn('weight')
    table.dropColumn('height')
  })

  await knex.schema.table('pokemons', table => {
    table.integer('weight')
    table.integer('height')
  })
};

exports.down = async function(knex) {
  await knex.schema.table('pokemons', table => {
    table.dropColumn('weight')
    table.dropColumn('height')
  })

  await knex.schema.table('pokemons', table => {
    table.integer('weight')
    table.integer('height')
  })
};
