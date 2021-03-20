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
            countryName: d.COUNTRY_NAME,
            releaseDate: d.RELEASE_DATE,
            budgetSum: d.BUDGETSUM,
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

async function getBudgets(startDate, endDate) {
    try {
        var daBudget = await dataService.getCountryYearBudgets(startDate, endDate);
        return mapBudgets(daBudget);
    } catch (err) {
        console.error(err);
    }
}

module.exports.findActor = findActor;
module.exports.getBudgets = getBudgets;