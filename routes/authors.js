var express = require('express')
var router = express.Router()
const db = require('../database')

router.get('/', (request, response) => {
  db.getAllAuthors()
    .then( authors => {
      response.render('./authors/index', {authors: authors})
    })
    .catch( error => {throw error})
})

router.get('/details/:author_id', (request, response) => {
  const { author_id } = request.params
  db.getAuthorById(author_id)
    .then(author => {
      response.render('authors/author-details', {author: author})
    })
})


module.exports = router
