const themGenreRatings1 = `
WITH a AS
(
	SELECT Movie_id, Release_Date, Genre_ID, Genre_Name
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
    SELECT Release_Date, Genre_Name, SUM(Rating) s, COUNT(Rating) c
    FROM a NATURAL JOIN Rating
    GROUP BY Genre_Name, Release_Date
    HAVING SUM(Rating) > 0
)
SELECT Release_Date, Genre_Name, s/c AS Average_Rating 
FROM b
ORDER BY Genre_Name, Release_Date
`;

module.exports.themGenreRatings1 = themGenreRatings1;
module.exports.themGenreRatings2 = themGenreRatings2;
