const dataService = require("./companiesDataService");

function mapCompanies(dbCompany) {
  return dbCompany.rows.map(d => {
    return {
      releaseDate: d.RELEASE_DATE,
      avgRating: d.AVG_RATING,
      budget: d.BUDGET,
      revenue: d.REVENUE,
      roi: d.ROI,
      companyName: d.COMPANY_NAME,
      title: d.TITLE
    }
  });
}

function mapCompanyNames(dbNames) {
  return dbNames.rows.map(actor => {
    return {
      name: actor.COMPANY_NAME
    }
  }); 
}

async function getCompanies(company, startDate, endDate) {
  try {
    var companyResults = await dataService.getCompanies(company, startDate, endDate);
    return mapCompanies(companyResults);
  } catch (err) {
    console.error(err);
  }
}

async function findCompany(name) {
  try {
    var companies = await dataService.getCompanyNames(name);
    return mapCompanyNames(companies);
  } catch (err) {
    console.error(err);
  }
}

module.exports.findCompany = findCompany;
module.exports.getCompanies = getCompanies;