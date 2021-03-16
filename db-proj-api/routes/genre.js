var express = require('express');
var router = express.Router();
var genreService = require("../data-access/genres/services/genreService");

router.get('/', async function (req, res, next) {
    result = await genreService.getAllGenres();
    res.json(result);
});

module.exports = router;
