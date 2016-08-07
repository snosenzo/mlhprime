var express = require('express');
var router = express.Router();
//get what we need from the db
router.post('/', function(req, res, next) {
  console.log(req.body);
  pixels = req.body.pixels;
});

module.exports = router;