const DATABASE_NAME = 'magpie-bookstore'
const connectionString = `postgres://${process.env.USER}@localhost:5432/${DATABASE_NAME}`
const pgp = require('pg-promise')()
const database =  pgp(connectionString)

const selectAllBooksByPage = "SELECT * FROM books LIMIT $1 OFFSET $2"
const selectBookById = "SELECT * FROM books WHERE id = $1"
const addBook = "INSERT INTO books( title, genre, cover, description ) VALUES( $1, $2, $3, $4 ) RETURNING id"
const deleteBook = "DELETE FROM books WHERE id = $1"
const updateBookTitle = "UPDATE books SET title = $1 WHERE id = $2"
const updateBookGenre = "UPDATE books SET genre = $1 WHERE id = $2"
const updateBookCover = "UPDATE books SET cover = $1 WHERE id = $2"
const updateBookDescription = "UPDATE books SET description=$1 WHERE id = $2"

const Book = {
  getAll: ( size, page ) => database.any( selectAllBooksByPage, [ size, page * size - size ] ),
  getById: book_id => database.one( selectBookById, [ book_id ] ),
  add: attributes => database.one( addBook, [ attributes.title, attributes.genre, attributes.cover, attributes.description ] ),
  delete: book_id => database.none( deleteBook, [ book_id ] ),
  updateTitle: ( title, book_id ) => database.none( updateBookTitle, [ title, book_id ] ),
  updateGenre: ( genre, book_id ) => database.none( updateBookGenre, [ genre, book_id ] ),
  updateCover: ( cover, book_id ) => database.none( updateBookCover, [ cover, book_id ] ),
  updateDescription: ( description, book_id ) => database.none( updateBookDescription, [ description, book_id ] )
}

const addUser = (newUser ) => {
  const sql= ` INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`
  const variables = [newUser.email, newUser.password]
  return database.one(sql,variables)
}

const authenticateUser = (email, password) => {
  const sql = `SELECT id, email, password FROM users WHERE email=$1`
  const variables = [email, password]
  return database.one(sql, variables)
}

const addAuthor = (authorName) => {
  const sql = `INSERT INTO authors(name) VALUES ($1) RETURNING id`
  return database.one(sql, authorName)
}

const updateAuthor = (authorName, bookId) => {
  const sql = `UPDATE authors SET name = $1 WHERE id = $2 RETURNING id`
  const variables = [authorName, bookId]
  return database.one(sql, variables )

}

const connectAuthorsWithBook = (authorId, bookId) => {
  const sql = `INSERT INTO book_authors(author_id, book_id) VALUES ($1, $2) RETURNING book_id`
  let variables = [authorId, bookId]
  return database.one(sql, variables)
}

const getAllAuthors = () => {
  const sql = `SELECT * FROM authors`
  return database.any(sql)
}

const getAuthorById = (authorId) => {
  const sql = `SELECT authors.* FROM authors WHERE id=$1`
  const variables = [authorId]
  return database.one(sql, variables)
}

const getBooksByAuthorId = (authorId) => {
  const sql = `SELECT books.* FROM books JOIN book_authors ON books.id = book_authors.book_id WHERE book_authors.author_id IN ($1)`
  const variables = [authorId]
  return database.any(sql, variables)
}

const getAuthorsByBookIds = (bookId) => {
  const sql = `SELECT authors.*, book_authors.book_id FROM authors JOIN book_authors ON authors.id = book_authors.author_id WHERE book_authors.book_id IN ($1)`
  return database.many(sql, [bookId])
}



const getBookAuthorsByBookId = (bookId) => {
  return Promise.all([
    Book.getById(bookId),
    getAuthorsByBookIds([bookId])
  ]).then( (data) => {
    const book = data[0]
    book.authors = data[1]
    return book
  })
}




module.exports = {
  addUser,
  authenticateUser,
  addAuthor,
  getAllAuthors,
  getAuthorById,
  Book,
  getAuthorsByBookIds,
  connectAuthorsWithBook,
  getBooksByAuthorId

}
