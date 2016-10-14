
const DATABASE_NAME = 'magpie-bookstore'
const connectionString = `postgres://${process.env.USER}@localhost:5432/${DATABASE_NAME}`
const pgp = require('pg-promise')()
const database =  pgp(connectionString)

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
  return database.one(sql,[authorName])
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
  const sql = `SELECT books.* FROM books JOIN book_authors ON books.id = author_books.book_id WHERE book_authors.author_id =$1`
  const variables = [authorId]
  return database.any(sql, variables)
}

const getAuthorsByBookIds = (bookId) => {
  const sql = `SELECT authors.*, book_authors.book_id FROM authors JOIN book_authors ON authors.id = book_authors.author_id WHERE book_authors.book_id IN ($1)`
  return database.many(sql, [bookId])
}
<<<<<<< HEAD
const connectAuthorsWithBook = (authorId, bookId) => {
  const sql = `INSERT INTO book_authors(author_id, book_id) VALUES ($1, $2)`
  let variables = [authorId, bookId]
  return database.none(sql, variables)
}
const getBookWithGenresAndAuthorsByBookId = (bookId) => {
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
  addAuthor,
  authenticateUser,
  getAllAuthors,
  getAuthorById,
  connectAuthorsWithBook


}
