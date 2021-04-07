var express = require('express');
var router = express.Router();
var budgetRatingService = require("../data-access/budgetRating/services/budgetRatingService");

router.get('/', async function (req, res, next) {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    result = await budgetRatingService.getBudgetRating(startDate, endDate);
    res.json(result);
});

module.exports = router;
