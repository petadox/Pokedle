const pokemon = require('./src/pokemon/routes.js')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const port = 3000

dotenv.config()
var app = express()

app.use(cors())

app.use('/pokemon', pokemon.router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
