const actorQueries = require("../queries/actorQueries");
const oracledb = require("oracledb");
var database = require("../../database");

async function getActors(name) {
    sql = actorQueries.getActors;

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

async function getActorSuccess(name, startDate, endDate) {
  sql = actorQueries.getActorSuccess;
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
module.exports.getActors = getActors;
module.exports.getActorSuccess = getActorSuccess;