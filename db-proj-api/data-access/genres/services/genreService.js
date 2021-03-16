const dataService = require("./genreDataService");

function mapGenres(dbGenres) {
    return dbGenres.rows; 
}

async function getAllGenres() {
  try {
    var allGenres = await dataService.getGenres();
    return mapGenres(allGenres);
  } catch (err) {
    console.error(err);
  }
}

module.exports.getAllGenres = getAllGenres;
