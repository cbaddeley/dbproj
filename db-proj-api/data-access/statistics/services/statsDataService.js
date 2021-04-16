const statsQueries = require("../queries/statsQueries");
const oracledb = require("oracledb");
var database = require("../../database");

async function getStats() {
    sql = statsQueries.databaseStats;
    binds = {};

    options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT, 
    };

    try {
      return await database.connection.execute(sql, binds, options);
    } catch (err) {
      console.error(err);
    }
}

module.exports.getStats = getStats;
