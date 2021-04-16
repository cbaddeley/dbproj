const dataService = require("./genreDataService");

function mapGenres(dbGenres) {
    return dbGenres.rows.map(genre => {
      return {
        releaseDate:  genre.RELEASE_DATE,
        avgRating:    genre.AVERAGE_RATING,
        genre:        genre.GENRE_NAME,
        title:        genre.TITLE
      }
    });  
}

function mapTop20Genres(dbGenres) {
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
    return mapTop20Genres(allGenres);
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
