var express = require('express');
var router = express.Router();
var budgetService = require("../data-access/countries/services/budgetService");

router.get('/', async function (req, res, next) {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const countryName = req.query.countryName;
    result = await budgetService.getBudgets(startDate, endDate, countryName)
    res.json(result);
});

module.exports = router;