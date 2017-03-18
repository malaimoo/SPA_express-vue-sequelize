var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({name:'aaa',pwd:'123',status:1});
});

module.exports = router;
