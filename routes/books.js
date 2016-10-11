var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (request, response) => {
  response.send('respond as books index page')
})

module.exports = router
