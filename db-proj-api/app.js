var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var database = require("./data-access/database");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var ping = require("./routes/ping");
var genres = require("./routes/genre");
var actors = require("./routes/actor");

app.use("/api/v1/ping", ping);
app.use("/api/v1/genres", genres);
app.use("/api/v1/actors", actors);

(async function () {
  database.connection = await database.init();
})();

module.exports = app;
