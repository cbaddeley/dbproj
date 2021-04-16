const dataService = require("./companyDataService");

function mapCompany(dbCompany) {
  return dbCompany.rows.map(d => {
    return {
      year: d.YEAR,
      month: d.MONTH,
      rating: d.AVG_RATING,
      budget_sum: d.BUDGET_SUM,
      budget_per_rating: d.BUDGET_PER_RATING,
      company_name: d.COMPANY_NAME,
      title: d.TITLE
    }
  });
}

async function getCompany(startDate, endDate, company) {
  try {
    var companyResults = await dataService.getBudgetRating(startDate, endDate, company);
    return mapCompany(companyResults);
  } catch (err) {
    console.error(err);
  }
}

module.exports.getCompanyNames = getCompanyNames;
module.exports.getCompaniesPart1 = getCompaniesPart1;
module.exports.getCompaniesPart2 = getCompaniesPart2;