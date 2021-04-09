
const getBudgetRatingPart1 = `
SELECT * FROM (
SELECT year, month, avg_rating, sum(budget) as budget_sum, sum(budget)/avg_rating as budget_per_rating
FROM (
SELECT movie_id, EXTRACT(MONTH FROM Release_Date) as month, EXTRACT(YEAR FROM Release_Date) as year, CEIL(AVG(rating)) as avg_rating, budget
FROM "SCOTT.ENGELHARDT".Rating NATURAL JOIN "SCOTT.ENGELHARDT".Movie
WHERE release_date BETWEEN TO_DATE(:startDate, 'YYYY-MM-DD') AND TO_DATE(:endDate, 'YYYY-MM-DD') AND Budget > 0 AND
user_id <> 999999
GROUP BY movie_id, release_date, budget
ORDER BY movie_id DESC)
GROUP BY year, month, avg_rating)
WHERE avg_rating IN
`;


const getBudgetRatingPart2 = `
ORDER BY year ASC, month ASC, avg_rating DESC
`;


module.exports.getBudgetRatingPart1 = getBudgetRatingPart1;
module.exports.getBudgetRatingPart2 = getBudgetRatingPart2;