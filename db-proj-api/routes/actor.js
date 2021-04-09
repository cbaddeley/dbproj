var express = require('express');
var router = express.Router();
var actorService = require("../data-access/actors/services/actorService");

router.get('/', async function (req, res, next) {
    const query = req.query.name;
    result = await actorService.findActor(query)
    res.json(result);
});

module.exports = router;
