var express = require('express')
var router = express.Router()

router.get('/', (request, response) => {
  response.send('list of all books index page')
})

router.get('/details/BOOKID', (request, response) => {
  response.send('respond as books details page')
})

router.get('/add', (request, response) => {
  response.send('redirect to add new book form')
})

router.post('/add', (request, response) => {
  response.send('post new info to the database')
})

router.get('/edit/BOOKID', (request, response) => {
  response.send('redirect to edit book form')
})

router.post('/edit/BOOKID', (request, response) => {
  response.send('post info to server redirect to new book')
})

router.post('/delete/BOOKID', (request, repsonse) => {
  response.send('delete from db return to front page')
})

module.exports = router
