const pgp = require('pg-promise')()
const DATABASE_NAME = 'magpie-bookstore'
const connectionString = `postgres://${process.env.USER}@localhost:5432/` + DATABASE_NAME
const database =  pgp(connectionString)

const selectDisticntBooks = `SELECT DISTINCT(books.*) FROM books`

const Search = {
  forBooks: search => {
    const variables = []
    const sql = `WHERE LOWER(books.title) LIKE`

  }
}

module.exports = { Search }
