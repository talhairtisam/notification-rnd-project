import mysql, { PoolOptions } from "mysql2/promise";

const access: PoolOptions = {
  user: "root",
  password: "dev123",
  database: "notification_rnd",
};

const conn = mysql.createPool(access);
export default conn;
