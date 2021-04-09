var express = require('express');
var router = express.Router();
var countryService = require("../data-access/countries/services/countryService");

router.get('/', async function (req, res, next) {
    result = await countryService.getTop20Countries();
    res.json(result);
});

module.exports = router;
