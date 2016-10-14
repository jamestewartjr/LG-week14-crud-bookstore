const express = require('express')
const router = express.Router()
const db = require('../database')

router.get('/signup', (request, response) => {
  response.render( 'create-user')

})

router.post('/signup', (request, response) => {
  let user = request.body
  db.addUser(user)
    .then( (user) => {
      response.redirect('/books')
    })
    .catch( (error) => {
      response.render('error', { error })
    })
})

router.post('/login', (request, response) => {
  const {email, password } = request.body
  db.authenticateUser(email, password)
    .then(email => {
      if (email) {
        response.redirect('/books')
      } else {
        response.render('login', {
          error: 'Email or Password Not Found'
        })
      }
    })
    .catch(error => {
      response.render('error', {
        error
      })
    })
})

router.post('/logout', (request, response) => {
  response.redirect('/')
})

router.get('/', (request, response) => {
  response.send('respond with a resource')
})

module.exports = router;
