const top20Countries = `
    SELECT c.COUNTRY_NAME, c.COUNTRY_CODE
    FROM COUNTRY c 
    INNER JOIN (
        SELECT COUNTRY_CODE, COUNT(COUNTRY_CODE) AS countrycount
        FROM MADE_IN 
        GROUP BY COUNTRY_CODE 
        ORDER BY countrycount DESC
        FETCH FIRST 20 ROWS ONLY
    ) c2 ON c2.COUNTRY_CODE = c.COUNTRY_CODE 
`;

module.exports.top20Countries = top20Countries;