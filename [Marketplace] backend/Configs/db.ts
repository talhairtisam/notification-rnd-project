import mysql, { PoolOptions } from "mysql2/promise";

const access: PoolOptions = {
  user: "root",
  password: "root",
  database: "notification",
};

const conn = mysql.createPool(access);
export default conn;