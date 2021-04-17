const companiesQueries = require("../queries/companiesQueries");
const oracledb = require("oracledb");
var database = require("../../database");

async function getCompanyNames(name) {
  sql = companiesQueries.getCompanyNames;

  binds = { name: `%${name}%` };

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

async function getCompanies(company_name, startDate, endDate) {
  sql = companiesQueries.getCompanies;
  binds = {
    company_name: `%${company_name}%`,
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

module.exports.getCompanyNames = getCompanyNames;
module.exports.getCompanies = getCompanies;
