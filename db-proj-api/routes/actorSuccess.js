var express = require('express');
var router = express.Router();
var actorService = require("../data-access/actors/services/actorService");

router.get('/', async function (req, res, next) {
    const name = req.query.name;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    result = await actorService.getActorSuccess(name, startDate, endDate);
    res.json(result);
});

module.exports = router;
