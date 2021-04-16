const dataService = require("./budgetRatingDataService");

function mapBudgetRating(dbBudgetRating) {
  return dbBudgetRating.rows.map(d => {
    return {
      //releaseDate: d.RELEASE_DATE,
      //title: d.TITLE,
      //avgRating: d.AVG_RATING,
      //avgROI: d.ROI,
      year: d.YEAR,
      month: d.MONTH,
      rating: d.AVG_RATING,
      budget_sum: d.BUDGET_SUM,
      budget_per_rating: d.BUDGET_PER_RATING
    }
  });
}

async function getBudgetRating(startDate, endDate, ratings) {
  try {
    var budgetRating = await dataService.getBudgetRating(startDate, endDate, ratings);
    return mapBudgetRating(budgetRating);
  } catch (err) {
    console.error(err);
  }
}

module.exports.getBudgetRating = getBudgetRating;