var express = require('express');

var router = express.Router();
//get what we need from the db
router.get('/', function(req, res, next) {
   res.json(pixels);
});

module.exports = router;