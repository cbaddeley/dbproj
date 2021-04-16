const dataService = require("./statsDataService");

function mapStats(stats) {
  return stats.rows.map((stat) => {
    return {
      tupleCount: stat.CNT,
      table: stat.FROM_TBL,
    };
  });
}

async function getStats() {
  try {
    var stats = await dataService.getStats();
    return mapStats(stats);
  } catch (err) {
    console.error(err);
  }
}

module.exports.getStats = getStats;
