const genreQueries = require("../queries/genreQueries");
const genreRatings = require("../queries/genreRatings");
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

async function getGenreRatings(startDate, endDate, genreIDray) {
  let insertedsql = "(";
  for (let i = 0; i < genreIDray.length; i++) {
    if (i == genreIDray.length - 1) insertedsql += `'${genreIDray[i]}'`;
    else insertedsql += `'${genreIDray[i]}'` + ", ";
  }
  insertedsql += ")";

  let sql = `${genreRatings.themGenreRatings1}${insertedsql}${genreRatings.themGenreRatings2}`;

  binds = {
    startDate: startDate,
    endDate: endDate,
  };

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

module.exports.getGenreRatings = getGenreRatings;
module.exports.getGenres = getGenres;
