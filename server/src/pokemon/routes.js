const express = require('express')
const pokemon = require('./service.js')

let router = express.Router()

router.get('/all-names', async (req, res) => {
  let pokemonNames = await pokemon.getAllPokemonNames()
  res.json(pokemonNames)
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
