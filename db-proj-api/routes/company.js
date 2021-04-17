var express = require('express');
var router = express.Router();
var companyService = require("../data-access/companies/services/companiesRatingService");

router.get('/', async function (req, res, next) {
    const name = req.query.name;
    result = await companyService.findCompany(name)
    res.json(result);
});

module.exports = router;
