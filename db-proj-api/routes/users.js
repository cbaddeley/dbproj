var express = require('express');
var router = express.Router();
var database = require("../data-access/database");

/* GET users listing. */
router.get('/', function(req, res, next) {
  database.ping();
  res.json({users: [{name: 'Timmy'}]});
});

module.exports = router;
