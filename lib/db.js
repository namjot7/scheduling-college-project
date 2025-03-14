// import mysql from 'mysql2'; // not working
import mysql from 'mysql2/promise'; // to ensure .query() returns a promise.

let pool;  // Store the connection pool

const initSql = async () => {
  // const db = await mysql.createConnection({
  //     database: process.env.MYSQL_DB_NAME,
  //     port: process.env.MYSQL_DB_PORT,
  //     host: process.env.MYSQL_HOST,
  //     user: process.env.MYSQL_USER,
  //     password: process.env.MYSQL_PASSWORD,
  // });
  // console.log("Connected to MySQL database");
  // return db;
  try {
    if (!pool) {
      pool = mysql.createPool({
        database: process.env.MYSQL_DB_NAME,
        port: process.env.MYSQL_DB_PORT,
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        // waitForConnections: true,  // Ensures it waits for an available connection
        // connectionLimit: 10,  // Limit to 10 simultaneous connections
        // queueLimit: 0,  // Unlimited queue (requests will wait for available connections)
      });
    }
    return pool;
  }
  catch (error) {
    console.log("Unable to connect with MySQL.");

  }
}
export default initSql;

