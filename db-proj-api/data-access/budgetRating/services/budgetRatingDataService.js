const budgetRatingQueries = require("../queries/budgetRatingQueries");
const oracledb = require("oracledb");
var database = require("../../database");


async function getBudgetRating(startDate, endDate, ratings) {
  let insertedsql = "(";
  for (let i = 0; i < ratings.length; i++) {
    if (i == ratings.length - 1) insertedsql += `'${ratings[i]}'`;
    else insertedsql += `'${ratings[i]}'` + ", ";
  }
  insertedsql += ")";
  // sql = budgetRatingQueries.getBudgetRating;

  let sql = `${budgetRatingQueries.getBudgetRatingPart1}${insertedsql}${budgetRatingQueries.getBudgetRatingPart2}`;

  binds = {
    startDate: startDate,
    endDate: endDate,
    //ratings: ratings
  };


  // For a complete list of options see the documentation.
  options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
  };

  try {
    return await database.connection.execute(sql, binds, options);
  } catch (err) {
    console.error(err);
  }
}
module.exports.getBudgetRating = getBudgetRating;