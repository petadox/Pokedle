const knex = require('knex')
const database = require('../knexfile.js')

const db = knex(database.development);

module.exports = db