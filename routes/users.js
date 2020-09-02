var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([{
  	id: 1,
  	username: "nwiegand"
  }, {
  	id: 2,
  	username: "wiegandj"
  }]);

});

module.exports = router;
