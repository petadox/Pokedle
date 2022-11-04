// Update with your config settings.
const dotenv = require('dotenv')
dotenv.config({path: "./env"});

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host:     '127.0.0.1',
      database: 'pokedle',
      user:     'root',
      password: 'Requiem1007'
    },
    pool: { min: 100, max: 200 },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations'
    }
  }
}