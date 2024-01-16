import SocketConfig from "../utils/socket.config";
import subscriber from "../utils/pubsub/subscriber";
import RedisService from "../utils/redis.config";
import db from "../utils/mysql2.config";

const reservationSubscriber = () => {
  const socketInstance = SocketConfig.getInstance();
  subscriber.subscribe("newReservation", async (responseBody: string) => {
    const body = JSON.parse(responseBody);
    console.log(body);
    const getUsersOfShopQuery = `SELECT user_id FROM seller_users WHERE shop_id = ${body.shop_id}`; // join with user permissions table for handle permissions
    const [usersOfShop]: any = await db.query(getUsersOfShopQuery);
    for (let user of usersOfShop) {
      const addNotification = `INSERT INTO seller_notifications SET user_id = ?, message = ?, is_read = ?`;
      const [addNotificationResult]: any = await db.query(addNotification, [user.user_id, body.message, false]);
      const notification = {
        notification_id: addNotificationResult.insertId,
        user_id: user.user_id,
        message: body.message,
        is_read: false,
      };
      console.log(notification);
      const redisClient: any = await RedisService.initRedis();
      const socketIds = await redisClient.sMembers("seller:" + user.user_id);
      socketInstance.io.to(socketIds).emit("liveNotification", notification);
    }
    // RedisService.initRedis().then((redisClient: any) => {
    //   redisClient.sMembers(body.userId.toString()).then((socketIds: any) => {
    //     // console.log(body.userId, socketIds);
    //     if (socketIds.length > 0) {
    //       socketInstance.io.to(socketIds).emit("liveNotification", body.message);
    //     }
    //   });
    // });
  });
};

export default reservationSubscriber;
