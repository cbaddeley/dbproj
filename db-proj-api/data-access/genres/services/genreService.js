const dataService = require("./genreDataService");

function mapGenres(dbGenres) {
    return dbGenres.rows.map(genre => {
      return {
        name: genre.GENRE_NAME,
        id: genre.GENRE_ID
      }
    });  
}

async function getTop20Genres() {
  try {
    var allGenres = await dataService.getGenres();
    return mapGenres(allGenres);
  } catch (err) {
    console.error(err);
  }
}

async function getGRresults(genreIn, startDate, endDate) {
  try {
    var allGenres = await dataService.getGenreRatings(genreIn, startDate, endDate);
    return mapGenres(allGenres);
  } catch (err) {
    console.error(err);
  }
}

module.exports.getTop20Genres = getTop20Genres;
module.exports.getGRresults = getGRresults;
