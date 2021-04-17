const getCompanyNames = `SELECT * FROM Company WHERE UPPER(company_name) LIKE UPPER(:name) FETCH FIRST 5 ROWS ONLY`;

const getCompanies = `
SELECT *
FROM (
    SELECT company_name, title, revenue, budget, (revenue / budget) * 100 AS roi, AVG(avg_rating) avg_rating, release_date
    FROM Production NATURAL JOIN COMPANY NATURAL JOIN (
        (
            SELECT movie_id, imdb_id, title, revenue, budget, release_date
            FROM Movie
            WHERE release_date between TO_DATE(:startDate, 'YYYY-MM-DD') AND TO_DATE(:endDate, 'YYYY-MM-DD')
                AND revenue > 0 AND budget > 0
        ) NATURAL JOIN (
            SELECT movie_id, AVG(rating) avg_rating
            FROM Rating
            GROUP BY movie_id
            )
        )
    GROUP BY company_name, title, revenue, budget, release_date
    )
    WHERE UPPER(company_name) LIKE UPPER(:company_name)
    ORDER BY release_date`;

module.exports.getCompanyNames = getCompanyNames;
module.exports.getCompanies = getCompanies;
