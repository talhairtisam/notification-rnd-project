import db from "../utils/mysql2.config";

export default class notifications {
  static async getAll(userId: number) {
    try {
      const fetchNotificatoinsQuery = `SELECT * FROM seller_notifications WHERE user_id = ? LIMIT 20`;
      const [fetchNotificatoinsResult]: any = await db.query(fetchNotificatoinsQuery, userId);
      return fetchNotificatoinsResult;
    } catch (err) {
      throw err;
    }
  }
  static async markAsRead(notificationId: number) {
    try {
      const updateQuery = `UPDATE seller_notifications SET is_read = ? WHERE notification_id = ?`;
      const [updateResult]: any = await db.query(updateQuery, [true, notificationId]);
      if (updateResult.affectedRows > 0) {
        return true;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }
}
