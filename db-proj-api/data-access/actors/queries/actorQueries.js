const getActors = `SELECT * FROM ACTOR WHERE UPPER(ACTOR_NAME) LIKE UPPER(:name) FETCH FIRST 5 ROWS ONLY`;

const getActorSuccess = `
SELECT title, release_date, avg_rating, roi
FROM (
    SELECT imdb_id, title, release_date, avg_rating
    FROM Movie NATURAL JOIN (
        SELECT imdb_id, AVG(avg_rating) AS avg_rating
        FROM ACTOR NATURAL JOIN Cast NATURAL JOIN (
            SELECT imdb_id, AVG(Rating) AS avg_rating
            FROM Movie NATURAL JOIN RATING
            Group by imdb_id
        )
        WHERE UPPER(actor_name) LIKE UPPER(:name) -- name passed from user
        GROUP BY imdb_id
    )
)  NATURAL FULL OUTER JOIN (
    SELECT imdb_id, title, release_date, roi
    FROM (
        SELECT imdb_id, title, release_date, roi
        FROM ACTOR NATURAL JOIN Cast NATURAL JOIN (
            SELECT imdb_id, title, release_date, (revenue / budget) * 100 AS roi
            FROM (
                SELECT imdb_id, title, release_date, budget, revenue
                FROM  Movie
                WHERE budget <> 0 AND revenue <> 0
            )
        )
        WHERE UPPER(actor_name) LIKE UPPER(:name) -- name passed from user
    ) 
)
WHERE release_date BETWEEN TO_DATE(:startDate, 'YYYY-MM-DD') AND TO_DATE(:endDate, 'YYYY-MM-DD') -- dates passed from user 
ORDER BY release_date ASC
`;

module.exports.getActors = getActors;
module.exports.getActorSuccess = getActorSuccess;