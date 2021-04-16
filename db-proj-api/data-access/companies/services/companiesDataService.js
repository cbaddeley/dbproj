const companiesQueries = require("../queries/comapniesQueries");
const oracledb = require("oracledb");
var database = require("../../database");

async function getCompanyNames(name) {
  sql = companiesQueries.getCompanies;

  binds = {name: `%${name}%`}

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

async function getCompanies(name, startDate, endDate) {
sql = companyQueries.getCompanies;
binds = {
  name: `%${name}%`,
  startDate: startDate,
  endDate: endDate
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
module.exports.getCompaniesPart1 = getCompaniesPart1;
module.exports.getCompaniesPart2 = getCompaniesPart2;