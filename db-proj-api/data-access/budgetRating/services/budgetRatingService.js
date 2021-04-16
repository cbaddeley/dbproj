const dataService = require("./budgetRatingDataService");

function mapBudgetRating(dbBudgetRating) {
  return dbBudgetRating.rows.map(d => {
    return {
      year: d.YEAR,
      month: d.MONTH,
      rating: d.AVG_RATING,
      budgetAvg: d.BUDGET_AVG
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