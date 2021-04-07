const dataService = require("./budgetDataService");

function mapNames(dbNames) {
    return dbNames.rows.map(actor => {
        return {
            id: actor.ACTOR_ID,
            name: actor.ACTOR_NAME
        }
    });
}


function mapBudgets(dbBudgets) {
    return dbBudgets.rows.map(d => {
        return {
            countryCode: d.COUNTRY_CODE,
            month: d.MONTH,
            budgetSum: d.BUDGET_SUM,
            countryName: d.COUNTRY_NAME,
            year: d.YEAR,
            budgetAvg: d.BUDGET_AVG
        }
    });
}

async function findActor(name) {
    try {
        var actors = await dataService.getActors(name);
        return mapNames(actors);
    } catch (err) {
        console.error(err);
    }
}

async function getBudgets(startDate, endDate, countries) {
    try {
        var daBudget = await dataService.getCountryYearBudgets(startDate, endDate, countries);
        return mapBudgets(daBudget);
    } catch (err) {
        console.error(err);
    }
}

module.exports.findActor = findActor;
module.exports.getBudgets = getBudgets;