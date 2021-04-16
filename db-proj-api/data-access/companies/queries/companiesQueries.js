const getCompanyNames = `SELECT * FROM Company WHERE UPPER(company_name) LIKE UPPER(:name) FETCH FIRST 5 ROWS ONLY`;

const getCompaniesPart1 = `
SELECT *
FROM (
    SELECT company_name, title, revenue, budget, (revenue / budget) * 100 AS roi, AVG(avg_rating) avg_rating, yr, mo
    FROM Production NATURAL JOIN COMPANY NATURAL JOIN (
        (
            SELECT movie_id, imdb_id, title, revenue, budget,
                EXTRACT(YEAR FROM release_date) yr, 
                EXTRACT(MONTH FROM release_date) mo
            FROM Movie
            WHERE release_date between TO_DATE(:startDate, 'YYYY-MM-DD') AND TO_DATE(:endDate, 'YYYY-MM-DD')
                AND revenue > 0 AND budget > 0
        ) NATURAL JOIN (
            SELECT movie_id, AVG(rating) avg_rating
            FROM Rating
            GROUP BY movie_id
            )
        )
    GROUP BY company_name, title, revenue, budget, yr, mo
    
    )
WHERE company_name in (`

const getCompaniesPart2 = `
    )
ORDER BY yr DESC, mo DESC, revenue DESC, budget DESC, roi DESC, avg_rating DESC`

module.exports.getCompanyNames = getCompanyNames;
module.exports.getCompaniesPart1 = getCompaniesPart1;
module.exports.getCompaniesPart2 = getCompaniesPart2;