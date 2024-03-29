var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const cors = require('cors');
var database = require("./data-access/database");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

var ping = require("./routes/ping");
var genres = require("./routes/genre");
var actors = require("./routes/actor");
var actorSuccess = require("./routes/actorSuccess");
var daBudgets = require("./routes/budgets");
var seasons = require("./routes/seasons");
var countries = require("./routes/country");
var budgetRating = require("./routes/budgetRating");
var genreRating = require("./routes/genreRating"); // Daniel added 4/7/21
var stats = require("./routes/stats"); 
var companies = require("./routes/company");
var companySuccess = require("./routes/companySuccess");

app.use("/api/v1/ping", ping);
app.use("/api/v1/genres", genres);
app.use("/api/v1/actors", actors);
app.use("/api/v1/actorSuccess", actorSuccess);
app.use("/api/v1/budgets", daBudgets);
app.use("/api/v1/seasons", seasons);
app.use("/api/v1/countries", countries);
app.use("/api/v1/budgetrating", budgetRating);
app.use("/api/v1/genreRating", genreRating);  // Daniel added 4/7/21
app.use("/api/v1/stats", stats);
app.use("/api/v1/companies", companies);
app.use("/api/v1/companySuccess", companySuccess);

(async function () {
  database.connection = await database.init();
})();

module.exports = app;
