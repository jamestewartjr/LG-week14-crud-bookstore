var express = require('express')
var router = express.Router()


router.get('/details', (request, response) => {
  response.send('show author books ')
})

module.exports = router
