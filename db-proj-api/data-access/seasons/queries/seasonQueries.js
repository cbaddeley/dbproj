const getSeasonalQuartiles = `
SELECT yr, season, AVG(avg_rating) AS avg_rating, AVG(roi) AS roi
FROM (
    WITH all_results as  ( 
        SELECT imdb_id, yr, season, AVG(avg_rating) AS avg_rating, rating_rank, AVG(roi) AS roi, roi_rank
        FROM (
            SELECT imdb_id, avg_rating, rating_rank, roi, roi_rank,
                EXTRACT(YEAR FROM release_date) AS yr, 
                CEIL((MOD(EXTRACT(MONTH FROM release_date), 12) + 1) / 3) AS season -- Winter = 1 Spring = 2 Summer = 3 Fall = 4
            FROM (
                SELECT *
                FROM (
                    SELECT imdb_id, AVG(avg_rating) AS avg_rating, RANK() OVER (ORDER BY AVG(avg_rating)) AS rating_rank
                    FROM (
                        SELECT imdb_id, AVG(Rating) AS avg_rating
                        FROM Movie NATURAL JOIN RATING
                        Group by imdb_id
                    )
                    GROUP BY imdb_id
                )
            ) 
            NATURAL FULL OUTER JOIN ( -- needed bc not all movies have ROI so we don't want their rating to drop
                SELECT *
                FROM (
                    SELECT imdb_id, release_date, (revenue / budget) * 100 AS roi,  RANK() OVER (ORDER BY (revenue / budget) * 100) AS roi_rank
                    FROM  Movie
                    WHERE budget <> 0 AND revenue <> 0
                ) 
                GROUP BY imdb_id, release_date, roi, roi_rank     
            )
        WHERE release_date BETWEEN TO_DATE(:startDate, 'YYYY-MM-DD') AND TO_DATE(:endDate, 'YYYY-MM-DD') -- start and end passed from user 
        )   
        GROUP BY imdb_id, yr, season, rating_rank, roi_rank
    )
    (
        -- ratings in top 25%
        SELECT imdb_id, yr, season, avg_rating, rating_rank, roi, roi_rank, 'top_rating' as quartile
        FROM all_results 
        GROUP BY imdb_id, yr, season, avg_rating, rating_rank, roi, roi_rank
        HAVING rating_rank >= (
            SELECT MAX(rating_rank)
            FROM all_results
            ) * 0.75
            
        UNION 
    
        -- ratings in bottom 25%
        SELECT  imdb_id, yr, season, avg_rating, rating_rank, roi, roi_rank, 'bottom_rating' as quartile
        FROM all_results 
        GROUP BY imdb_id, yr, season, avg_rating, rating_rank, roi, roi_rank
        HAVING rating_rank <= (
            SELECT MAX(rating_rank)
            FROM all_results
            ) * 0.25
    )
    UNION ALL
    (
        -- roi in top 25%
        SELECT imdb_id, yr, season, avg_rating, rating_rank, roi, roi_rank, 'top_roi' as quartile
        FROM all_results 
        GROUP BY imdb_id, yr, season, avg_rating, rating_rank, roi, roi_rank
        HAVING roi_rank >= (
            SELECT MAX(roi_rank)
            FROM all_results
            ) * 0.75
            
        UNION
        
        -- roi in bottom 25%
        SELECT  imdb_id, yr, season, avg_rating, rating_rank, roi, roi_rank, 'bottom_roi' as quartile
        FROM all_results 
        GROUP BY imdb_id, yr, season, avg_rating, rating_rank, roi, roi_rank
        HAVING roi_rank <= (
            SELECT MAX(roi_rank)
            FROM all_results
            ) * 0.25
    )
)
WHERE quartile = :quartile
GROUP BY yr, season
ORDER BY yr, season
`;

module.exports.getSeasonalQuartiles = getSeasonalQuartiles;
