const top20Genres = `
SELECT g.GENRE_NAME, g.GENRE_ID
FROM GENRE g 
INNER JOIN (
	SELECT GENRE_ID, COUNT(GENRE_ID) AS genrecount
	FROM HAS_GENRE
	GROUP BY GENRE_ID 
	ORDER BY genrecount DESC
	FETCH FIRST 20 ROWS ONLY
) g2 ON g2.GENRE_ID = g.GENRE_ID  
`;

module.exports.top20Genres = top20Genres;