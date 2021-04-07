const dataService = require("./actorDataService");

function mapNames(dbNames) {
    return dbNames.rows.map(actor => {
      return {
        id: actor.ACTOR_ID,
        name: actor.ACTOR_NAME
      }
    }); 
}

function mapActorSucces(dbActorSuccess) {
  return dbActorSuccess.rows.map(d => {
    return {
      releaseDate: d.RELEASE_DATE,
      title: d.TITLE,
      avgRating: d.AVG_RATING,
      avgROI: d.ROI,
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

async function getActorSuccess(name, startDate, endDate) {
  try {
    var actorSuccess = await dataService.getActorSuccess(name, startDate, endDate);
    return mapActorSucces(actorSuccess);
  } catch (err) {
    console.error(err);
  }
}

module.exports.findActor = findActor;
module.exports.getActorSuccess = getActorSuccess;