import mysql from "mysql2";
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "safely_rest",
});
export const db = pool.promise();
