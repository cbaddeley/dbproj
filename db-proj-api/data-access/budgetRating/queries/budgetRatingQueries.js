
const getBudgetRating = `
SELECT user_id, movie_id, time_stamp, rating
FROM Rating 
WHERE time_stamp BETWEEN TO_DATE(:startDate, 'YYYY-MM-DD') AND TO_DATE(:endDate, 'YYYY-MM-DD')
FETCH FIRST 5 ROWS ONLY
`;

module.exports.getBudgetRating = getBudgetRating;