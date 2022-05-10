var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/api/login', function(req, res, next) {
  res.send({
    code:0,
    a:1
  });
});

module.exports = router;
