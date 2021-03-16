const getActors = `SELECT * FROM ACTOR WHERE UPPER(ACTOR_NAME) LIKE UPPER(:name) FETCH FIRST 5 ROWS ONLY`;

module.exports.getActors = getActors;