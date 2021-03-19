const getActors = `SELECT * FROM ACTOR WHERE UPPER(ACTOR_NAME) LIKE UPPER(:name) FETCH FIRST 5 ROWS ONLY`;

const getActorSuccess = `
SELECT
	yr,
	mo,
	AVG(rating) AS avg_rating,
	AVG(roi) AS avg_roi
FROM
	(
	SELECT
		EXTRACT(YEAR FROM time_stamp) AS yr,
		EXTRACT(MONTH FROM time_stamp) AS mo,
		rating,
		(revenue / budget) * 100 AS roi
	FROM
		ACTOR a
	INNER JOIN CAST c ON
		c.ACTOR_ID = a.ACTOR_ID
	INNER JOIN MOVIE m ON
		m.IMDB_ID = c.IMDB_ID
    FULL OUTER JOIN RATING r ON
		r.MOVIE_ID = m.MOVIE_ID
	WHERE
		time_stamp > TO_DATE(:startDate, 'YYYY-MM-DD')
		AND time_stamp < TO_DATE(:endDate, 'YYYY-MM-DD')
		AND UPPER(actor_name) LIKE UPPER(:name)
		AND budget <> 0
		AND revenue <> 0 )
GROUP BY
	yr,
	mo
ORDER BY
	yr,
	mo
`;

module.exports.getActors = getActors;
module.exports.getActorSuccess = getActorSuccess;