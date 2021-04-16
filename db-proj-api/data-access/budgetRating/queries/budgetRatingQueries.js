const getBudgetRatingPart1 = `
SELECT
	YEAR,
	MONTH,
	avg_rating,
	AVG(budget) AS budget_avg
FROM
	(
	SELECT
		movie_id,
		EXTRACT(MONTH FROM Release_Date) AS MONTH,
		EXTRACT(YEAR FROM Release_Date) AS YEAR,
		CEIL(AVG(rating)) AS avg_rating,
		budget
	FROM
		Rating NATURAL
	JOIN Movie
	WHERE
		release_date BETWEEN TO_DATE(:startDate, 'YYYY-MM-DD') AND TO_DATE(:endDate, 'YYYY-MM-DD')
		AND Budget > 0
		AND user_id <> 999999
	GROUP BY
		movie_id,
		release_date,
		budget
	ORDER BY
		YEAR,
		MONTH )
WHERE
	avg_rating IN
`;


const getBudgetRatingPart2 = `
GROUP BY
	avg_rating,
	YEAR,
	MONTH
ORDER BY
	avg_rating,
	YEAR,
	MONTH
`;


module.exports.getBudgetRatingPart1 = getBudgetRatingPart1;
module.exports.getBudgetRatingPart2 = getBudgetRatingPart2;