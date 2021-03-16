const dataService = require("./actorDataService");

function mapNames(dbNames) {
    return dbNames.rows.map(actor => {
      return {
        id: actor.ACTOR_ID,
        name: actor.ACTOR_NAME
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

module.exports.findActor = findActor;