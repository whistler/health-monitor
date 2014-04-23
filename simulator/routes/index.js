var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('rickshaw/examples/simulator.html');
});

module.exports = router;
