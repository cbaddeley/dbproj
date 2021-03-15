const oracledb = require("oracledb");
const dbConfig = require("./dbconfig.js");

class Database {
  connection;

  static async init() {
    try {
      oracledb.initOracleClient({ libDir: "C:\\oracle\\instantclient_19_10" });
      this.connection = await oracledb.getConnection(dbConfig);
      console.log('Database Connection Established')
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }

  static async ping() {
      try {
        console.log('Pinging Database...');
        await this.connection.ping().then((f) => console.log('Sucessfully Pinged Database'));
      }
      catch (err) {
        console.error(err);
        process.exit(1);
      }
      
  }
}

module.exports = Database;
