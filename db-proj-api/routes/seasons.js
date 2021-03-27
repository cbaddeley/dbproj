var express = require('express');
var router = express.Router();
var seasonService = require("../data-access/seasons/services/seasonService");

router.get('/', async function (req, res, next) {
    const quartile = req.query.quartile;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    result = await seasonService.getSeasonalQuartiles(quartile, startDate, endDate)
    res.json(result);
});

module.exports = router;