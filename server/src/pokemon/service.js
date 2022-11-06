const Pokemon = require('./models.js')
const axios = require('axios')

exports.fetchPokemons = async () => {
  for (let i = 899; i <= 905; ++i) { // ESTOS QUE FALTAN TIENEN MAL LA CHAIN EVOLUTION EN POKEAPI
    let pokemon_response = await getPokemonInfo(i)
    let species_response = await getPokemonSpecies(i)
    let evolution_response = await getPokemonEvolutionChain(species_response.evolution_chain?.url)

    let pokemon = mountPokemonObject(pokemon_response, species_response, evolution_response)
    
    updatePokemon(pokemon)
  }
}

function mountPokemonObject(pokemon, species, evolutions) {
  let pokemonObject = {
    name: pokemon.name,
    id: pokemon.id,
    weight: pokemon.weight,
    height: pokemon.height,
    type_1: pokemon.types[0].type.name,
    type_2: pokemon.types[1]?.type?.name || null,
    sprite: pokemon.sprites.front_default,
    color: species.color.name,
    generation: formatGeneration(species.generation.name),
    preevolution: hasPreEvolution(evolutions.chain, pokemon.name),
    evolution: hasEvolution(evolutions.chain, pokemon.name),
    image: getImage(pokemon.id)
  }
  return pokemonObject
}

function formatGeneration(generation) {
  // MEJORAR: Parser de numeros romanos
  switch (generation.split('-')[1]) {
    case 'i':
      return 1
    case 'ii':
      return 2
    case 'iii':
      return 3
    case 'iv':
      return 4
    case 'v':
      return 5
    case 'vi':
      return 6
    case 'vii':
      return 7
    case 'viii':
      return 8
    case 'ix':
      return 9
  }
}

function getImage(id) {
  let baseUrl = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'
  baseUrl = baseUrl + ('000' + id.toString()).substr(-3).concat('.png')
  return baseUrl
}

function hasPreEvolution(evolution_chain, pokemon_name) {
  return !(evolution_chain.species.name === pokemon_name)
}

function hasEvolution(evolution_chain, pokemon_name) {
  if (pokemon_name === evolution_chain.species.name) {
    if (evolution_chain.evolves_to.length) {
      return true
    } else {
      return false
    }
  }

  let evolutions = evolution_chain.evolves_to.map(evolution => {
    return hasEvolution(evolution, pokemon_name)
  })
  return evolutions.includes(true)
}

async function getPokemonEvolutionChain(request) {
  return (await axios.get(request)).data
}

async function getPokemonInfo(id) {
  return (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data
}

async function getPokemonSpecies(id) {
  return (await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)).data
}

exports.getAllPokemons = async () => {
  let pokemons = await Pokemon.query().select('name', 'sprite')
  return pokemons.map(pokemon => (
    {
      label: pokemon.name,
      sprite: pokemon.sprite
    }
  ))
}

exports.getPokemonByName = async (name) => {
  let pokemonByName = await Pokemon.query()
    .where({ name })
  return pokemonByName[0]
}

exports.getRandomPokemon = async () => {
  let id = Math.floor((Math.random() * 898) + 1)
  let pokemonRandom = await Pokemon.query()
    .where({ id })
  return pokemonRandom[0]
}

async function updatePokemon(pokemon) {
  await Pokemon.query()
    .insert(pokemon)
}