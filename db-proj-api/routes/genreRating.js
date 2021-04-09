var express = require('express');
var router = express.Router();
var genreService = require("../data-access/genres/services/genreService");

router.get('/', async function (req, res, next) {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const genreID = req.query.genreID;
    const genreIDray = genreID.split(',');

    result = await genreService.getGRresults(startDate, endDate, genreIDray)
    res.json(result);
});

module.exports = router;
