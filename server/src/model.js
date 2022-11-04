const { Model, snakeCaseMappers } = require('objection')
const db = require('./db.js')

Model.knex(db)

class LModel extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers()
  }
}

module.exports = LModel
