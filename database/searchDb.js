const pgp = require('pg-promise')()
const DATABASE_NAME = 'magpie-bookstore'
const connectionString = `postgres://${process.env.USER}@localhost:5432/` + DATABASE_NAME
const database =  pgp(connectionString)

const selectDisticntBooks = `SELECT DISTINCT(books.*) FROM books`

const Search = {
  forBooks: search => {
    const variables = []
    const sql = `WHERE LOWER( books.title ) LIKE $${ variables.length }
                  OR LOWER( books.genre ) LIKE $${ variables.length }
                  OR LOWER( books.description ) LIKE $${ variables.length }
                  ORDER BY books.id ASC LIMIT `

  }
}

module.exports = { Search }
 
