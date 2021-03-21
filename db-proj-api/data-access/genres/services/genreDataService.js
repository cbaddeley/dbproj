const genreQueries = require("../queries/genreQueries");
const oracledb = require("oracledb");
var database = require("../../database");

async function getGenres() {
    sql = genreQueries.top20Genres;

    binds = {};

    // For a complete list of options see the documentation.
    options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
      // extendedMetaData: true,               // get extra metadata
      // prefetchRows:     100,                // internal buffer allocation size for tuning
      // fetchArraySize:   100                 // internal buffer allocation size for tuning
    };

    try {
      return await database.connection.execute(sql, binds, options);
    } catch (err) {
      console.error(err);
    }
}

module.exports.getGenres = getGenres;
