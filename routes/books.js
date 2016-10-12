const express = require('express')
const router = express.Router()
const { Book } = require( '../database/booksDb' )

//TODO: adjust for displaying entire list of books
router.get('/', (request, response) => {

  Book.getAll()
  .then( books => {
    console.log(books)
    console.log(books.id)
    response.render( 'index', { books } )})
})

router.get('/add', (request, response) => {
  response.render( 'books/add-book' )
})

router.post('/add', (request, response) => {
  const { title, author, genre, cover } = request.body

  // if( title && author && genre && img_url) {
  if( title ) {
    Book.add( title )
    .then( book_id => {

    })
    //TODO: Insert create book function
    //TODO: Redirect to book-details of newly added book.
    response.redirect( 'details' )
  } else {
    const error = true
    response.render( 'books/add-book', { error: error } )
  }
})

router.get( '/delete/:book_id', ( request, response ) => {
  const { book_id } = request.params
  // Book.delete( book_id )
  response.redirect( 'books/' )

})

//TODO: adjust for specific book id
router.get('/details', (request, response) => {
  response.render( 'books/book-details' )
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
