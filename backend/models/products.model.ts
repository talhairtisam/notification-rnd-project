import db from "../utils/mysql2.config";

export default class products {
  static async getAll(shopId: number) {
    try {
      const fetchProductsQuery = `SELECT * FROM products WHERE shop_id = ?`;
      const [fetchProductsResult]: any = await db.query(fetchProductsQuery, shopId);
      return fetchProductsResult;
    } catch (err) {
      throw err;
    }
  }
  static async add(title: string, price: number, shopId: number) {
    try {
      const addProductQuery = `INSERT INTO products SET title = ?, price = ?, shop_id = ?`;
      const [addProductResult]: any = await db.query(addProductQuery, [title, price, shopId]);
      if (addProductResult.insertId) {
        return addProductResult.insertId;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }
  static async getById(shopId: number, productId: number) {
    try {
      const fetchProductsQuery = `SELECT * FROM products WHERE shop_id = ? AND product_id = ?`;
      const [fetchProductsResult]: any = await db.query(fetchProductsQuery, [shopId, productId]);
      if (fetchProductsResult.length > 0) {
        return fetchProductsResult[0];
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }
  // static async login(username: any) {
  //   try {
  //     const registerShopQuery = `SELECT s.shop_id, s.shop_name, su.first_name, su.last_name, su.user_id FROM shops s JOIN seller_users su ON su.shop_id = s.shop_id WHERE su.username = ?`;
  //     const [registerShopResult]: any = await db.query(registerShopQuery, username);
  //     return registerShopResult;
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}
