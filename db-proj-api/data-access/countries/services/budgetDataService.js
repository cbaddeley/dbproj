const budgetQueries = require("../queries/budgetQueries");
const oracledb = require("oracledb");
var database = require("../../database");

async function getBudgets() {
  sql = budgetQueries.getBudgets;

  binds = {
    /*name: `%${name}%`*/
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

async function getCountryYearBudgets(startDate, endDate, countries) {
  let insertedsql = "(";
  for (let i = 0; i < countries.length; i++) {
    if (i == countries.length - 1) insertedsql += `'${countries[i]}'`;
    else insertedsql += `'${countries[i]}'` + ", ";
  }
  insertedsql += ")";
  
  let sql = `${budgetQueries.getCountryYearBudgetsPart1}${insertedsql}${budgetQueries.getCountryYearBudgetsPart2}`;

  binds = {
    startDate: startDate,
    endDate: endDate,
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
