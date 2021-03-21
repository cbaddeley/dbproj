const dataService = require("./countryDataService");

function mapCountries(dbCountries) {
  return dbCountries.rows.map(country => {
    return {
      name: country.COUNTRY_NAME,
      code: country.COUNTRY_CODE
    }
  }); 
}

async function getTop20Countries() {
  try {
    var top20Countries = await dataService.getTop20Countries();
    return mapCountries(top20Countries);
  } catch (err) {
    console.error(err);
  }
}

module.exports.getTop20Countries = getTop20Countries;
