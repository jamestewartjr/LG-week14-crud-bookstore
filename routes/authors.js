var express = require('express')
var router = express.Router()
const db = require('../database')

router.get('/', (request, response) => {
  db.getAllAuthors()
    .then( authors => {
      response.render('authors/index', {authors: authors})
    })
    .catch( (error) => {
        response.render('error', { error: error } )
    })
})

router.get('/details/:author_id', (request, response) => {
  const { author_id } = request.params
  console.log( "authorId", author_id)
  Promise.all([
    db.getAuthorById(author_id),
    db.getBooksByAuthorId(author_id)
  ])
    .then(info => {
      const author = info[0]
      const book = info[1]
      console.log( "author", author)
      console.log( "book", book)
      response.render('authors/author-details', {
        book: book,
        author: author

      })
    })
    .catch( (error) => {
        response.render('error', { error: error } )
     })
})


module.exports = router
