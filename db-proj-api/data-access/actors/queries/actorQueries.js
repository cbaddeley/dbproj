const getActors = `SELECT * FROM ACTOR WHERE ACTOR_NAME LIKE :name FETCH FIRST 5 ROWS ONLY`;

module.exports.getActors = getActors;