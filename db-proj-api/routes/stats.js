var express = require('express');
var router = express.Router();
var statsService = require("../data-access/statistics/services/statsService");

router.get('/', async function (req, res, next) {
    result = await statsService.getStats();
    res.json(result);
});

module.exports = router;
