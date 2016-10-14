const express = require('express')
const router = express.Router()
const { Book } = require( '../database/booksDb' )
const db = require('../database')

router.get('/', ( request, response ) => {
  const { query } = request

  const page = parseInt( query.page || 1 )
  const size = parseInt( query.size || 5 )
  const nextPage = page + 1
  const previousPage = page - 1 > 0 ? page - 1 : 1

  Book.getAll( size, page ).then( books => {
    response.render( './index', { books: books,
                                  page: page,
                                  size: size,
                                  nextPage: nextPage,
                                  previousPage: previousPage })
  })
})

router.get('/add', (request, response) => {
  response.render( 'books/add-book' )
})

router.post('/add', (request, response) => {

  const { title, author, genre, cover } = request.body

  if( title && author ) {
    Book.add( title )
    .then( data => {

      let book_id = data['id']
      db.addAuthor( author )
      .then( data => {

        let author_id = data['id']
        db.connectAuthorsWithBook( author_id, book_id )
      })
      
      if ( genre ) Book.updateGenre( genre, book_id )
      if ( cover ) Book.updateCover( cover, book_id )
      response.redirect( `details/${book_id}` )
    })
  } else {
      const error = true
      response.render( 'books/add-book', { error: error } )
    }
})

router.get( '/delete/:book_id', ( request, response ) => {
  const { book_id } = request.params
  Book.delete( book_id ).then( response.redirect( '/books/' ) )
})

//TODO: adjust for specific book id
router.get('/details/:book_id', (request, response) => {
  const { book_id } = request.params
  Book.getById( book_id )
  .then( book => { response.render( 'books/book-details', { book: book } ) })
})

//TODO: adjust for specific book id
router.get('/edit', (request, response) => {
  response.render( 'books/edit-book' )
})

//TODO: adjust to send UPDATED book values to database
router.post('/edit/BOOKID', (request, response) => {
  response.send('post info to server redirect to new book')
})

router.post('/delete/BOOKID', (request, repsonse) => {
  response.send('delete from db return to front page')
})

module.exports = router
