var express = require('express');
var router = express.Router();
var genreService = require("../data-access/genres/services/genreService");

router.get('/', async function (req, res, next) {
    const genre = req.query.genreIn;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    result = await genreService.getGRresults();
    res.json(result);
});

module.exports = router;
