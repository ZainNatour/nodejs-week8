import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "library_nodejs",
});
export default connection;
