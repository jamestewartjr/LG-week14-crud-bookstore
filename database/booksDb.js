const pgp = require('pg-promise')()
const DATABASE_NAME = 'magpie-bookstore'
const connectionString = `postgres://${process.env.USER}@localhost:5432/` + DATABASE_NAME
const database =  pgp(connectionString)

const selectAllBooks = "SELECT * FROM books"
const addBook = "INSERT INTO books( title ) VALUES( $1 ) RETURNING id"

const Book = {
  getAll: () => database.many( selectAllBooks ),
  add: title => database.one( addBook, [ title ] )
}

module.exports = { Book }
