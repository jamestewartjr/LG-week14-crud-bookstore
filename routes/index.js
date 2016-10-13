var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', (request, response) => {
  response.render('index' )
})

module.exports = router
