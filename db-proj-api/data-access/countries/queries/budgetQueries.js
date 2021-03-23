const getBudgets = `SELECT * FROM MOVIE FETCH FIRST 5 ROWS ONLY`;


const getCountryYearBudgets = `
WITH tmpTbl AS
(
    SELECT Country_Name, Budget, Release_Date
    FROM Movie  NATURAL JOIN Made_In NATURAL JOIN Country
    WHERE Budget > 0
    AND Release_Date > TO_DATE(:startDate, 'YYYY-MM-DD')
    AND Release_Date < TO_DATE(:endDate, 'YYYY-MM-DD')
)
SELECT Country_Name, Release_Date, SUM(Budget) Budget
FROM tmpTbl 
GROUP BY Country_Name, Release_Date
HAVING  UPPER(Country_Name) LIKE UPPER(:countryName)
ORDER BY Release_Date
`;

module.exports.getBudgets = getBudgets;
module.exports.getCountryYearBudgets = getCountryYearBudgets;