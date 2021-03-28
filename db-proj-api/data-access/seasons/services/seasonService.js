const dataService = require("./seasonDataService");


function mapSeasonQuartiles(dbSeasonalQueries) {
  return dbSeasonalQueries.rows.map(d => {
    return {
      year : d.YR,
      season: d.SEASON,
      avgRating: d.AVG_RATING,
      avgROI: d.ROI,
    }
  });
}


async function getSeasonalQuartiles(quartile, startDate, endDate) {
  try {
    var seasonQuartiles = await dataService.getSeasonalQuartiles(quartile, startDate, endDate);
    return mapSeasonQuartiles(seasonQuartiles);
  } catch (err) {
    console.error(err);
  }
}

module.exports.getSeasonalQuartiles = getSeasonalQuartiles;