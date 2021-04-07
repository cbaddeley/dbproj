const dataService = require("./budgetRatingDataService");

function mapBudgetRating(dbBudgetRating) {
  return dbBudgetRating.rows.map(d => {
    return {
      //releaseDate: d.RELEASE_DATE,
      //title: d.TITLE,
      //avgRating: d.AVG_RATING,
      //avgROI: d.ROI,
      userID: d.USER_ID,
      movieID: d.MOVIE_ID,
      timeStamp: d.TIME_STAMP,
      rating: d.RATING
    }
  });
}

async function getBudgetRating(startDate, endDate) {
  try {
    var budgetRating = await dataService.getBudgetRating(startDate, endDate);
    return mapBudgetRating(budgetRating);
  } catch (err) {
    console.error(err);
  }
}

module.exports.getBudgetRating = getBudgetRating;