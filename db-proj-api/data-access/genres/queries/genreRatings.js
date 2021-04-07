const themGenreRatings = `
WITH a AS
(
	SELECT Movie_id, Genre_Name, Release_Date
	FROM    Genre       NATURAL JOIN
            Movie       NATURAL JOIN 
            Has_Genre
            
            WHERE   UPPER(Genre_Name) LIKE UPPER(:genreIn) AND
            Release_Date BETWEEN    TO_DATE(:startDate, 'YYYY-MM-DD') AND
                                    TO_DATE(:endDate, 'YYYY-MM-DD')
),
    b AS
(
    SELECT Release_Date, SUM(Rating) s, COUNT(Rating) c
    FROM a NATURAL JOIN Rating
    GROUP BY Release_Date
)
SELECT Release_Date, TO_CHAR(s/c, 9.9) avgRating 
FROM b
ORDER BY Release_Date
`;

module.exports.themGenreRatings = themGenreRatings;