var express = require('express');
var router = express.Router();
var actorService = require("../data-access/actors/services/actorDataService");

router.get('/', async function (req, res, next) {
    result = await actorService.getAllGenres();
    res.json(result);
});

module.exports = router;
