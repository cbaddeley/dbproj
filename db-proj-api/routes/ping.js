var express = require('express');
var router = express.Router();
var database = require("../data-access/database");

router.get('/', async function(req, res, next) {
  await database.ping(database.connection);
  res.json('Sucessfully Pinged Database');
});

module.exports = router;
