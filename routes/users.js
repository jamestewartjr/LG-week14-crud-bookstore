var express = require('express')
var router = express.Router()

router.get('/signup', (request, response) => {
  response.send( 'get the signup form')
})

router.post('/signup', (request, response) => {
  response.send('post new user info to db & redirect somewhere')
})

router.get('/login', (request, response) => {
  response.send('show login form')
})

router.post('/login', (request, response) => {
  response.send(' If User, begin user session & redirect')
})

router.post('logout', (request, response) => {
  response.send(' End user session & redirect')
})

router.get('/', (request, response) => {
  response.send('respond with a resource')
})

module.exports = router;
