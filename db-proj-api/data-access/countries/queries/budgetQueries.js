const getBudgets = `SELECT * FROM MOVIE FETCH FIRST 5 ROWS ONLY`;


const getCountryYearBudgets = `
WITH tmpTbl AS
(
    SELECT Country_Name, Budget, Release_Date
    FROM Movie  NATURAL JOIN Made_In NATURAL JOIN Country
    WHERE Budget > 0
    AND Release_Date > TO_DATE(:startDate, 'YYYY-MM-DD')    -- :startDate = '1901-01-01'
    AND Release_Date < TO_DATE(:endDate, 'YYYY-MM-DD')      -- :endDate = '1999-01-01'
)
SELECT Country_Name, Release_Date, SUM(Budget) Budget
FROM tmpTbl 
GROUP BY Country_Name, Release_Date
HAVING  UPPER(Country_Name) LIKE UPPER(:cName1) OR
        UPPER(Country_Name) LIKE UPPER(:cName2) OR
        UPPER(Country_Name) LIKE UPPER(:cName3) OR
        UPPER(Country_Name) LIKE UPPER(:cName4) -- cName4 tested with NULL
ORDER BY Release_Date
`;

module.exports.getBudgets = getBudgets;
module.exports.getCountryYearBudgets = getCountryYearBudgets;