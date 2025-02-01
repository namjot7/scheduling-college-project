// import mysql from 'mysql2'; // not working
import mysql from 'mysql2/promise'; // to ensure .query() returns a promise.

const initSql = async () => {
    const db = await mysql.createConnection({
        database: process.env.MYSQL_DB_NAME,
        port: process.env.MYSQL_DB_PORT,
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
    });
    console.log("Connected to MySQL database");
    return db;

}
export default initSql;

