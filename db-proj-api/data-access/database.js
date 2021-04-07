const oracledb = require("oracledb");
const dbConfig = require("./dbconfig.js");

let connection;

async function init() {
  try {
    oracledb.initOracleClient({ libDir: "C:\\oracle\\instantclient_19_10" });
    var connection = await oracledb.getConnection(dbConfig);
    connection.currentSchema = '"SCOTT.ENGELHARDT"';
    console.log('Database Connection Established')
    return connection;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

async function ping(connection) {
  try {
    console.log('Pinging Database...');
    return await connection.ping();
  }
  catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports.connection = connection;
module.exports.init = init;
module.exports.ping = ping;
