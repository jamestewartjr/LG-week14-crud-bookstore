const pgp = require('pg-promise')()
const DATABASE_NAME = 'magpie-bookstore'
const connectionString = 'postgres://${process.env.USER}@localhost:5432/' + DATABASE_NAME
const database =  pgp(connectionString)
