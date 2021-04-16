const databaseStats = `
WITH totals AS (
    SELECT *
    FROM (
        SELECT COUNT(*) cnt, 'actor' as from_tbl
        FROM ACTOR 
        UNION
        SELECT COUNT(*) cnt, 'cast' as from_tbl
        FROM CAST 
        UNION
        SELECT COUNT(*) cnt, 'company' as from_tbl
        FROM Company
        UNION
        SELECT COUNT(*) cnt, 'country' as from_tbl
        FROM Country
        UNION
        SELECT COUNT(*) cnt, 'genre' as from_tbl
        FROM Genre
        UNION
        SELECT COUNT(*) cnt, 'has_genre' as from_tbl
        FROM Has_Genre
        UNION
        SELECT COUNT(*) cnt, 'made_in' as from_tbl
        FROM Made_In
        UNION
        SELECT COUNT(*) cnt, 'movie' as from_tbl
        FROM Movie
        UNION
        SELECT COUNT(*) cnt, 'production' as from_tbl
        FROM Production
        UNION
        SELECT COUNT(*) cnt, 'rating' as from_tbl
        FROM Rating
    )
)
SELECT * FROM totals
UNION (SELECT SUM(cnt) cnt, 'total' as from_tbl FROM totals)
`;

module.exports.databaseStats = databaseStats;