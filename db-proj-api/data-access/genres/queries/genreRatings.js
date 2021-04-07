const themGenreRatings1 = `
WITH a AS
(
	SELECT Movie_id, Release_Date, Genre_ID
	FROM    Genre       NATURAL JOIN
            Movie       NATURAL JOIN 
            Has_Genre
            WHERE Genre_id IN
`;

const themGenreRatings2 = `
            AND
            Release_Date BETWEEN TO_DATE(:startDate, 'YYYY-MM-DD') AND
                                 TO_DATE(:endDate, 'YYYY-MM-DD')
),
    b AS
(
    SELECT Release_Date, SUM(Rating) s, COUNT(Rating) c
    FROM a NATURAL JOIN Rating
    GROUP BY Release_Date
)
SELECT Release_Date, TO_CHAR(s/c, 9.9) Average_Rating 
FROM b
ORDER BY Release_Date
`;

module.exports.themGenreRatings1 = themGenreRatings1;
module.exports.themGenreRatings2 = themGenreRatings2;