const express = require('express')
const pokemon = require('./service.js')

let router = express.Router()

router.get('/all', async (req, res) => {
  let pokemons = await pokemon.getAllPokemons()
  res.json(pokemons)
})

router.get('/random', async (req, res) => {
  let pokemonRandom = await pokemon.getRandomPokemon()
  res.json(pokemonRandom)
})

router.get('/:name', async ({ params }, res) => {
  let pokemonByName = await pokemon.getPokemonByName(params.name)
  res.json(pokemonByName)
})

router.post('/fetch', async () => {
  await pokemon.fetchPokemons()
})

exports.router = router
