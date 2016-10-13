const pgp = require('pg-promise')()
const DATABASE_NAME = 'magpie-bookstore'
const connectionString = `postgres://${process.env.USER}@localhost:5432/` + DATABASE_NAME
const database =  pgp(connectionString)

const selectAllBooksByPage = "SELECT * FROM books LIMIT $1 OFFSET $2"
const selectBookById = "SELECT * FROM books WHERE id = $1"
const addBook = "INSERT INTO books( title ) VALUES( $1 ) RETURNING id"
const deleteBook = "DELETE FROM books WHERE id = $1"
const updateBookTitle = "UPDATE books SET title = $1 WHERE id = $2"
const updateBookGenre = "UPDATE books SET genre = $1 WHERE id = $2"
const updateBookCover = "UPDATE books SET cover = $1 WHERE id = $2"
const updateBookDescription = "UPDATE books SET description=$1 WHERE id = $2"

const Book = {
  getAll: ( size, page ) => database.any( selectAllBooksByPage, [ size, page * size - size ] ),
  getById: book_id => database.one( selectBookById, [ book_id ] ),
  add: title => database.one( addBook, [ title ] ),
  delete: book_id => database.none( deleteBook, [ book_id ] ),
  updateTitle: ( title, book_id ) => database.none( updateBookTitle, [ title, book_id ] ),
  updateGenre: ( genre, book_id ) => database.none( updateBookGenre, [ genre, book_id ] ),
  updateCover: ( cover, book_id ) => database.none( updateBookCover, [ cover, book_id ] ),
  updateDescription: ( description, book_id ) => database.none( updateBookDescription, [ description, book_id ] )
}

module.exports = { Book }
