const budgetQueries = require("../queries/budgetQueries");
const oracledb = require("oracledb");
var database = require("../../database");

async function getBudgets() {
    sql = budgetQueries.getBudgets;

    binds = {/*name: `%${name}%`*/}

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

async function getCountryYearBudgets(startDate, endDate, countryCode) {
  sql = budgetQueries.getCountryYearBudgets;
  binds = {
    startDate: startDate,
    endDate: endDate,
    countryCode: `%${countryCode}%`
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
module.exports.getBudgets = getBudgets;
module.exports.getCountryYearBudgets = getCountryYearBudgets;