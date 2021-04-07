const dataService = require("./genreDataService");

function mapGenres(dbGenres) {
    return dbGenres.rows.map(genre => {
      return {
        releaseDate:  genre.RELEASE_DATE,
        avgRating:    genre.AVERAGE_RATING
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

async function getGRresults(startDate, endDate, genreIDray) {
  try {
    var allGenres = await dataService.getGenreRatings(startDate, endDate, genreIDray);
    return mapGenres(allGenres);
  } catch (err) {
    console.error(err);
  }
}

module.exports.getTop20Genres = getTop20Genres;
module.exports.getGRresults = getGRresults;
