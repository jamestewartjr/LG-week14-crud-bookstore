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
  Promise.all([
    db.getAuthorById(author_id),
    db.getBooksByAuthorId(author_id)
  ])
    .then(info => {
      const author = info[0]
      const books = info[1]
      response.render('authors/author-details', {
        books: books,
        author: author

      })
    })
    .catch( (error) => {
        response.render('error', { error: error } )
     })
})


module.exports = router
