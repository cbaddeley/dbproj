const getBudgets = `SELECT * FROM MOVIE FETCH FIRST 5 ROWS ONLY`;

const getCountryYearBudgetsPart1 = `
WITH tmpTbl AS
(
    SELECT imdb_id, Country_Code, Country_Name, Budget, Release_Date
    FROM Movie  NATURAL JOIN Made_In NATURAL JOIN Country
    WHERE Budget > 0
    AND Release_Date > TO_DATE(:startDate, 'YYYY-MM-DD')
    AND Release_Date < TO_DATE(:endDate, 'YYYY-MM-DD')
),
 a AS
(
    SELECT Country_Code, Country_Name, EXTRACT(MONTH FROM Release_Date) month, EXTRACT (YEAR FROM Release_Date) year, SUM(Budget) Budget, COUNT(*) cnt
    FROM tmpTbl
    GROUP BY Country_Code, Country_Name, Release_Date
    ORDER BY Release_Date
)
SELECT Country_Code, Country_Name, SUM(Budget) BUDGET_SUM, month, year, SUM(Budget)/SUM(cnt) BUDGET_AVG
FROM a
WHERE Country_Code IN 
`;

const getCountryYearBudgetsPart2 = `
GROUP BY Country_Code, Country_Name, month, year
ORDER BY Country_Code, year, month
`;

module.exports.getBudgets = getBudgets;
module.exports.getCountryYearBudgetsPart1 =getCountryYearBudgetsPart1;
module.exports.getCountryYearBudgetsPart2 = getCountryYearBudgetsPart2;
