const LModel = require('../model.js')

class Pokemon extends LModel {
  static get tableName() {
    return 'pokemons'
  }
}

module.exports = Pokemon