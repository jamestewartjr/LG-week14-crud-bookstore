const express = require('express')
const router = express.Router()
const { Book } = require( '../database' )
const db = require('../database')


router.get('/', ( request, response ) => {
  const { query } = request

  const page = parseInt( query.page || 1 )
  const size = parseInt( query.size || 5 )
  const nextPage = page + 1
  const previousPage = page - 1 > 0 ? page - 1 : 1

  Book.getAll( size, page ).then( books => {
    response.render( 'books/index', { books: books,
                                  page: page,
                                  size: size,
                                  nextPage: nextPage,
                                  previousPage: previousPage } )
    })
})

router.get('/add', (request, response) => {
  response.render( 'books/add-book' )
})

router.post('/add', (request, response) => {
  const { title, author, genre, cover, description } = request.body

  Promise.all([
    Book.add( request.body),
    db.addAuthor( author )
  ])
  .then( results => {
    const bookId = results[0]
    const authorId = results[1]

    db.connectAuthorsWithBook(authorId.id, bookId.id)
    .then( (results) => {
      response.redirect(`/books/details/${results.book_id}`)
    })
  })
  .catch( (error) => {
      response.render('error', { error: error } )
  })

})


router.get('/details/:book_id', (request, response) => {
  const book_id  = request.params.book_id
  Promise.all([
    Book.getById(book_id),
    db.getAuthorsByBookIds([book_id])
  ])
  .then( (data) => {
    const book = data[0]
    const author = data[1][0]
    response.render( 'books/book-details', {
      book: book,
      author: author
    })
  })
  .catch( (error) => {
    response.render('error', { error: error } )
  })
})
router.get('/edit/:book_id', (request, response) => {
  const { book_id } = request.params

  Promise.all([
    Book.getById( book_id ),
    db.getAuthorsByBookIds( book_id)
  ])
    .then( data  => {
      const book = data[0]
      const author = data[1][0]

      response.render( 'books/edit-book', {
        book: book,
        author: author
      })
    })
    .catch( (error) => {
      response.render('error', { error: error } )
    })
})

router.post('/edit/:book_id', (request, response) => {
  const { book_id } = request.params
  console.log("book_id", book_id)
  const { title, author, genre, cover, description } = request.body
  console.log("body", request.body)

  Promise.all([
    db.updateAuthor(author, book_id),
    db.updateBook(book_id, request.body)
  ])

  response.redirect(`/books/details/${book_id}`)
})

router.get( '/delete/:book_id', ( request, response ) => {
  const { book_id } = request.params
  Book.getById( book_id )
    .then( book => { response.render( 'books/delete-book', { book: book } )
  })
})

router.post('/delete/:book_id', (request, response ) => {
  const { book_id } = request.body
  Book.delete( book_id ).then( response.redirect( '/books/' ) )
})

module.exports = router
