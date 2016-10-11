var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', (request, response) => {
  response.send('This is the home page' )
})

module.exports = router
