var express = require('express');
var router = express.Router();
var companyService = require("../data-access/companies/services/companiesRatingService");

router.get('/', async function (req, res, next) {
    const name = req.query.name;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    result = await companyService.getCompanies(name, startDate, endDate)
    res.json(result);
});

module.exports = router;
