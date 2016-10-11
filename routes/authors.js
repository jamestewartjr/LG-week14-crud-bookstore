var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function(request, response) {
  ressponse.send('respond with authors page')
})

module.exports = router
