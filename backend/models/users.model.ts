import db from "../utils/mysql2.config";

export default class users {
  static async signup(shopname: any, user: any) {
    let conn;
    try {
      conn = await db.getConnection();
      await conn.beginTransaction();
      const registerShopQuery = `INSERT INTO shops SET ?`;
      const shopObj = {
        shop_name: shopname,
      };
      const [registerShopResult]: any = await conn.query(registerShopQuery, shopObj);
      if (!registerShopResult?.insertId) {
        conn.rollback();
        throw new Error("Shop not created!");
      }
      const userQuery = `INSERT INTO seller_users SET ?`;
      const userObj = {
        shop_id: registerShopResult.insertId,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
      };
      const [userResult]: any = await conn.query(userQuery, userObj);
      if (!userResult?.insertId) {
        conn.rollback();
        throw new Error("User not created!");
      }
      conn.commit();
      return { ...userObj, user_id: userResult.insertId };
    } catch (err) {
      if (conn) {
        throw err;
      }
    } finally {
      if (conn) {
        conn?.release();
      }
    }
  }
  static async login(username: any) {
    try {
      const registerShopQuery = `SELECT s.shop_id, s.shop_name, su.first_name, su.last_name, su.user_id FROM shops s JOIN seller_users su ON su.shop_id = s.shop_id WHERE su.username = ?`;
      const [registerShopResult]: any = await db.query(registerShopQuery, username);
      return registerShopResult;
    } catch (err) {
      throw err;
    }
  }
}
